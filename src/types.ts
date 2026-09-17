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
