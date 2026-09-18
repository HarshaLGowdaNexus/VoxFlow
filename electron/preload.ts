import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  hideWindow: () => ipcRenderer.send('hide-window'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings: any) => ipcRenderer.invoke('save-settings', settings),
  getOllamaModels: () => ipcRenderer.invoke('get-ollama-models'),
  setSetting: (key: string, value: any) => ipcRenderer.invoke('set-setting', key, value),
  getTranscripts: () => ipcRenderer.invoke('get-transcripts'),
  getHistory: () => ipcRenderer.invoke('get-history'),
  clearHistory: () => ipcRenderer.invoke('clear-history'),
  copyTranscript: (text: string) => ipcRenderer.invoke('copy-transcript', text),
  getState: () => ipcRenderer.invoke('get-state'),
  toggleRecording: () => ipcRenderer.invoke('toggle-recording'),
  onStateChanged: (callback: (state: string) => void) => {
    ipcRenderer.on('state-changed', (_event, value) => callback(value));
  },
  onNavigate: (callback: (screen: string) => void) => {
    ipcRenderer.on('navigate', (_event, screen) => callback(screen));
  },
  onHistoryUpdated: (callback: () => void) => {
    ipcRenderer.on('history-updated', () => callback());
  },
  saveAudio: (arrayBuffer: ArrayBuffer) => ipcRenderer.invoke('save-audio', arrayBuffer),
  onStartRecording: (callback: () => void) => {
    ipcRenderer.on('start-recording', () => callback());
  },
  onStopRecording: (callback: () => void) => {
    ipcRenderer.on('stop-recording', () => callback());
  },
  removeStateListener: () => {
    ipcRenderer.removeAllListeners('state-changed');
  }
});
