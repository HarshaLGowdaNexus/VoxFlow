export type ScreenType = 'tray' | 'settings' | 'transcripts' | 'brand';

export type TrayEngineState = 'idle' | 'recording' | 'processing';

export interface TranscriptItem {
  id: string;
  timestamp: string;
  relativeTime: string;
  wordCount: number;
  targetApp: string;
  targetAppClass?: string;
  isPinned: boolean;
  text: string;
  audioDuration: string;
  model: string;
  category: 'code' | 'notes' | 'email' | 'planning' | 'architecture';
  rawTokens?: string[];
  audioPeakDb?: string;
  targetProcess?: string;
}

export interface ModelOption {
  id: string;
  name: string;
  size: string;
  description: string;
  latency: string;
  status: 'Downloaded' | 'Ready' | 'Current' | 'Fetch';
  isCurrent?: boolean;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  text: string;
  model: string;
  wordCount: number;
}

declare global {
  interface Window {
    electronAPI: {
      getSettings: () => Promise<any>;
      saveSettings: (settings: any) => Promise<any>;
      getOllamaModels: () => Promise<string[]>;
      setSetting: (key: string, value: any) => Promise<any>;
      getHistory: () => Promise<HistoryItem[]>;
      clearHistory: () => Promise<boolean>;
      getTranscripts: () => Promise<TranscriptItem[]>;
      copyTranscript: (text: string) => Promise<void>;
      getState: () => Promise<TrayEngineState>;
      toggleRecording: () => Promise<void>;
      closeWindow: () => void;
      minimizeWindow: () => void;
      onStateChanged: (callback: (state: TrayEngineState) => void) => void;
      onNavigate: (callback: (screen: ScreenType) => void) => void;
      onHistoryUpdated: (callback: () => void) => void;
      removeStateListener: () => void;
      saveAudio: (arrayBuffer: ArrayBuffer) => Promise<void>;
      onStartRecording: (callback: () => void) => void;
      onStopRecording: (callback: () => void) => void;
    };
  }
}
