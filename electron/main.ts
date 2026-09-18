import { app, BrowserWindow, Menu, Tray, Notification, clipboard, ipcMain } from 'electron';
import { uIOhook, UiohookKey } from 'uiohook-napi';
import record from 'node-record-lpcm16';
import fs from 'fs';
import path from 'path';
import { spawn, ChildProcess } from 'child_process';
import { keyboard, Key } from '@nut-tree-fork/nut-js';
import Store from 'electron-store';

app.disableHardwareAcceleration();

const store = new Store({
  defaults: {
    ollamaEnabled: true,
    ollamaModel: 'llama3',
    whisperModel: 'small.en',
    hotkey: 'F8'
  }
});

let mainWindow: BrowserWindow | null = null;
let pythonProcess: ChildProcess | null = null;
let tray: Tray | null = null;
let isQuitting = false;

// History system
const historyPath = path.join(app.getPath('userData'), 'history.json');
let historyCache: any[] = [];
try {
  if (fs.existsSync(historyPath)) {
    historyCache = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  }
} catch (e) {
  console.error('Failed to load history', e);
}

function saveToHistory(text: string, model: string) {
  const newEntry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    text,
    model,
    wordCount: text.split(/\s+/).filter(w => w.length > 0).length
  };
  
  historyCache.unshift(newEntry);
  if (historyCache.length > 500) {
    historyCache = historyCache.slice(0, 500);
  }
  
  try {
    fs.writeFileSync(historyPath, JSON.stringify(historyCache, null, 2));
    if (mainWindow) {
      mainWindow.webContents.send('history-updated');
    }
  } catch (e) {
    console.error('Failed to save history', e);
  }
}

// Fix PATH for SoX (installed via winget) so node-record-lpcm16 can find it
const soxPath = path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Packages', 'ChrisBagwell.SoX_Microsoft.Winget.Source_8wekyb3d8bbwe', 'sox-14.4.2');
if (fs.existsSync(soxPath)) {
  process.env.PATH = `${soxPath};${process.env.PATH}`;
}

let isRecording = false;
let recordingStream: any = null;
let currentAudioPath = '';
let startTime = 0;

let pythonReady = false;

async function improveTextWithOllama(text: string): Promise<string> {
  console.log('Sending text to Ollama for cleanup...');
  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: store.get('ollamaModel'),
        system: 'You are a strict text correction tool. Your ONLY job is to fix spelling, grammar, and punctuation. You MUST preserve the exact original meaning and context. DO NOT add new words, do not change the subject, and do not hallucinate details. DO NOT include any conversational filler (like "Here is the text"). Output ONLY the corrected text.',
        prompt: text,
        stream: false
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.response.trim();
    } else {
      console.error(`Ollama returned status ${response.status}`);
    }
  } catch (err) {
    console.error('Ollama connection failed:', err);
  }
  return text; // Fallback to raw text if it fails
}

function startPythonEngine() {
  const pythonDir = app.isPackaged 
    ? path.join(process.resourcesPath, 'python')
    : path.join(process.cwd(), 'python');
    
  const pythonExecutable = path.join(pythonDir, 'venv', 'Scripts', 'python.exe');
  const scriptPath = path.join(pythonDir, 'stt_service.py');
  const whisperModel = store.get('whisperModel') as string;
  
  if (!fs.existsSync(pythonExecutable)) {
    console.error(`Python venv not found at ${pythonExecutable}`);
    return;
  }

  pythonProcess = spawn(pythonExecutable, [scriptPath, whisperModel], {
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: process.cwd()
  });

  let stdoutBuffer = '';
  pythonProcess.stdout?.on('data', (data) => {
    stdoutBuffer += data.toString();
    let newlineIndex;
    while ((newlineIndex = stdoutBuffer.indexOf('\n')) !== -1) {
      const line = stdoutBuffer.slice(0, newlineIndex).trim();
      stdoutBuffer = stdoutBuffer.slice(newlineIndex + 1);
      
      if (line === 'STT_READY') {
        pythonReady = true;
        console.log('Python Engine: READY');
      } else if (line.startsWith('STT_RESULT:')) {
        const text = line.substring('STT_RESULT:'.length).trim();
        console.log(`\n--- TRANSCRIPTION SUCCESS ---`);
        console.log(`Raw Whisper Output: ${text}`);
        
        // Phase 5 + 6: Ollama Cleanup -> Keyboard Injection
        (async () => {
          try {
            let finalCleanText = text;
            if (store.get('ollamaEnabled')) {
              finalCleanText = await improveTextWithOllama(text);
            }
            console.log(`Final Text to Type: ${finalCleanText}`);
            console.log(`---------------------------\n`);

            // Instead of typing character-by-character which drops letters on some systems,
            // we copy to clipboard and simulate Ctrl+V for instant, flawless injection.
            clipboard.writeText(finalCleanText + ' ');
            await keyboard.pressKey(Key.LeftControl, Key.V);
            await keyboard.releaseKey(Key.LeftControl, Key.V);
            
            console.log('Successfully pasted text into active window.');
            saveToHistory(finalCleanText, store.get('ollamaEnabled') ? store.get('ollamaModel') as string : 'raw-whisper');
            mainWindow?.webContents.send('history-updated');
          } catch (e) {
            console.error('Keyboard injection failed:', e);
          }
        })();
        
      } else if (line) {
        console.log(`Python: ${line}`);
      }
    }
  });

  pythonProcess.stderr?.on('data', (data) => {
    console.error(`Python Error: ${data.toString().trim()}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    pythonReady = false;
  });
}

function startRecording() {
  if (isRecording) return;
  isRecording = true;
  startTime = Date.now();
  currentAudioPath = path.join(app.getPath('temp'), `voxflow_recording_${Date.now()}.wav`);
  
  console.log(`\n--- STARTING RECORDING ---`);
  console.log(`Path: ${currentAudioPath}`);
  console.log(`Format: 16000Hz, Mono, 16-bit`);

  const fileStream = fs.createWriteStream(currentAudioPath, { encoding: 'binary' });
  
  try {
    recordingStream = record.record({
      sampleRate: 16000,
      channels: 1,
      audioType: 'wav', // Output a wav header so it's a valid wav file
      endOnSilence: false
    });
    
    // Ignore the unhandled exception that node-record-lpcm16 throws when killed on Windows
    recordingStream.stream().on('error', (err: any) => {
      if (err.message && err.message.includes('error code null')) {
        // Expected behavior on Windows when process is killed
        return;
      }
      console.error('Recording stream error:', err);
    });

    recordingStream.stream().pipe(fileStream);
  } catch (e) {
    console.error('Failed to start recording:', e);
    isRecording = false;
  }
}

function stopRecording() {
  if (!isRecording) return;
  isRecording = false;
  console.log(`--- STOPPING RECORDING ---`);
  
  if (recordingStream) {
    recordingStream.stop();
    recordingStream = null;
  }

  // Wait a brief moment to ensure the file stream flushes
  setTimeout(() => {
    if (fs.existsSync(currentAudioPath)) {
      const stats = fs.statSync(currentAudioPath);
      // For 16kHz, 16-bit, mono: 1 sec = 16000 * 2 bytes = 32000 bytes
      const durationSeconds = (stats.size - 44) / 32000; // Subtracting 44 bytes for WAV header
      console.log(`\n--- RECORDING RESULTS ---`);
      console.log(`File: ${currentAudioPath}`);
      console.log(`Size: ${stats.size} bytes`);
      console.log(`Estimated Duration: ${durationSeconds > 0 ? durationSeconds.toFixed(2) : 0} seconds`);
      
      if (stats.size < 100) {
        console.warn(`WARNING: File is suspiciously small! Audio might not have been captured.`);
      } else {
        if (pythonReady && pythonProcess && pythonProcess.stdin) {
          console.log(`Sending to Python Engine...`);
          pythonProcess.stdin.write(`TRANSCRIBE:${currentAudioPath}\n`);
        } else {
          console.warn('Python engine is not ready to transcribe.');
        }
      }
    } else {
      console.error('File was not created!');
    }
  }, 500);
}

function createWindow(showWindow: boolean = true) {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: false,
    show: showWindow,
    backgroundColor: '#0E0E10',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('[Main] did-finish-load fired!');
    mainWindow?.webContents.executeJavaScript(`
      console.log('DOM Content:', document.body.innerHTML.substring(0, 200));
      console.log('Tailwind loaded:', getComputedStyle(document.body).backgroundColor);
    `);
  });

  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[Renderer Console] ${message}`);
  });
}

app.whenReady().then(() => {
  app.setAppUserModelId('com.voxflow.app');
  
  // Register Auto-Start for Windows
  if (app.isPackaged) {
    app.setLoginItemSettings({
      openAtLogin: true,
      path: app.getPath('exe'),
      args: ['--hidden']
    });
  }

  const loginSettings = app.getLoginItemSettings();
  const wasOpenedAtLogin = loginSettings.wasOpenedAtLogin || process.argv.includes('--hidden');

  console.log('App ready. Setting up Phase 4 (Python integration)...');
  
  createWindow(!wasOpenedAtLogin);

  // Setup IPC Handlers
  ipcMain.handle('get-state', () => {
    if (isRecording) return 'recording';
    if (pythonReady) return 'ready';
    return 'starting';
  });

  ipcMain.handle('toggle-recording', () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  });

  // Setup IPC Handlers
  ipcMain.handle('get-settings', () => store.store);
  ipcMain.handle('save-settings', (_, newSettings) => {
    store.set(newSettings);
    // Restart python engine if whisper model changed
    // We can just rely on the user to restart the app for now, or handle it here
  });
  
  ipcMain.handle('get-ollama-models', async () => {
    try {
      // Using standard http module to avoid any node fetch weirdness
      return new Promise((resolve) => {
        const http = require('http');
        http.get('http://127.0.0.1:11434/api/tags', (resp: any) => {
          let data = '';
          resp.on('data', (chunk: any) => { data += chunk; });
          resp.on('end', () => {
            try {
              const parsed = JSON.parse(data);
              resolve(parsed.models.map((m: any) => m.name));
            } catch (err) {
              console.error('JSON parse error for Ollama tags:', err);
              resolve([]);
            }
          });
        }).on('error', (err: any) => {
          console.error('Failed to fetch Ollama models (http.get):', err.message);
          resolve([]);
        });
      });
    } catch (e) {
      console.error('Outer error fetching Ollama models:', e);
    }
    return [];
  });

  ipcMain.handle('get-transcripts', () => []);
  
  ipcMain.on('minimize-window', () => {
    mainWindow?.minimize();
  });
  
  ipcMain.on('close-window', () => {
    console.log('DEBUG: close-window received from renderer!');
    mainWindow?.hide();
  });

  ipcMain.handle('get-history', () => historyCache);
  ipcMain.handle('clear-history', () => {
    historyCache = [];
    fs.writeFileSync(historyPath, JSON.stringify(historyCache, null, 2));
    return true;
  });

  startPythonEngine();

  // Setup Tray
  const { nativeImage } = require('electron');
  tray = new Tray(nativeImage.createEmpty()); // Use placeholder icon for now
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open VoxFlow', click: () => mainWindow?.show() },
    { label: 'Settings', click: () => { mainWindow?.show(); mainWindow?.webContents.send('navigate', 'settings'); } },
    { type: 'separator' },
    { label: 'Quit', click: () => { isQuitting = true; app.quit(); } }
  ]);
  tray.setToolTip('VoxFlow');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    if (mainWindow?.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow?.show();
      mainWindow?.webContents.send('navigate', 'tray');
    }
  });

  uIOhook.on('keydown', (e) => {
    // Push-To-Talk: F8 key
    if (e.keycode === UiohookKey.F8) {
      if (!isRecording) {
        startRecording();
        if (Notification.isSupported()) {
          new Notification({ title: 'VoxFlow', body: 'Recording Started...' }).show();
        }
      }
    }
  });

  uIOhook.on('keyup', (e) => {
    // Push-To-Talk: F8 key
    if (e.keycode === UiohookKey.F8 && isRecording) {
      stopRecording();
      if (Notification.isSupported()) {
        new Notification({ title: 'VoxFlow', body: 'Recording Stopped' }).show();
      }
    }
  });

  uIOhook.start();
  console.log('uIOhook started. Hold F8 to record audio.');
});

app.on('will-quit', () => {
  uIOhook.stop();
  if (pythonProcess) {
    pythonProcess.kill();
  }
});
