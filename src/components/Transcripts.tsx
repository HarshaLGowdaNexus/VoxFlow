import React, { useState } from 'react';
import {
  Search,
  SortDesc,
  ChevronDown,
  Star,
  Download,
  Trash2,
  Terminal,
  Play,
  Pause,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Lock,
  Calendar,
  Volume2,
  Sliders,
  Keyboard,
  Mic,
  BrainCircuit,
  Database,
  Info,
  ChevronRight,
  Code,
  FileText,
} from 'lucide-react';
import { WindowsTitleBar } from './common/WindowsTitleBar';
import { TranscriptItem } from '../types';

interface TranscriptsProps {
  onNavigate?: (screen: 'tray' | 'settings' | 'brand') => void;
}

const SAMPLE_TRANSCRIPTS: TranscriptItem[] = [
  {
    id: '#tx_98a44c',
    timestamp: '10:42 AM',
    relativeTime: '2m ago',
    wordCount: 18,
    targetApp: 'VS Code',
    isPinned: true,
    text: 'Please review the updated pull request on GitHub and verify the WebGL audio visualizer shader pipeline before Friday deployment. Let\'s make sure the audio loopback device handles 48 kHz float buffers gracefully.',
    audioDuration: '6.2s',
    model: 'Whisper v3-Small',
    category: 'code',
    targetProcess: 'Code - Insiders.exe',
    audioPeakDb: '-18.4 dB peak',
    rawTokens: [
      '[0.0s -> 1.4s] "please review the updated" (conf: 0.998)',
      '[1.4s -> 3.1s] "pull request on git hub and verify the" (conf: 0.991)',
      '[3.1s -> 4.8s] "web gl audio visualizer shader pipeline" (conf: 0.984)',
      '[4.8s -> 6.2s] "before friday deployment" (conf: 0.996)',
    ],
  },
  {
    id: '#tx_82f10b',
    timestamp: '10:07 AM',
    relativeTime: '35m ago',
    wordCount: 22,
    targetApp: 'Outlook PWA',
    isPinned: false,
    text: 'Draft email to Sarah: Thanks for the design critique. We have aligned on the #5B8CFF accent and Segoe UI Variable typography...',
    audioDuration: '7.8s',
    model: 'Whisper Tiny',
    category: 'email',
    targetProcess: 'msedge_proxy.exe',
  },
  {
    id: '#tx_71a09d',
    timestamp: 'Yesterday 4:15 PM',
    relativeTime: 'Yesterday',
    wordCount: 12,
    targetApp: 'Terminal',
    isPinned: true,
    text: 'git commit -m "fix(audio): handle buffer underrun in WASAPI loopback"',
    audioDuration: '3.4s',
    model: 'Whisper v3-Small',
    category: 'code',
    targetProcess: 'WindowsTerminal.exe',
  },
  {
    id: '#tx_65d44a',
    timestamp: 'Yesterday 2:30 PM',
    relativeTime: 'Yesterday',
    wordCount: 16,
    targetApp: 'Notion',
    isPinned: false,
    text: 'Action items for sprint 42: finish Settings hotkey recorder, test Ollama local fallback, polish tray icon states.',
    audioDuration: '5.1s',
    model: 'Whisper v3-Small',
    category: 'planning',
    targetProcess: 'Notion.exe',
  },
  {
    id: '#tx_59c31e',
    timestamp: 'Yesterday 11:15 AM',
    relativeTime: 'Yesterday',
    wordCount: 45,
    targetApp: 'Obsidian',
    isPinned: false,
    text: 'When memory mapped audio ring-buffers exceed 512 chunks, push backpressure to the pipeline thread before scheduling DirectML tokens...',
    audioDuration: '11.8s',
    model: 'Whisper Turbo',
    category: 'architecture',
    targetProcess: 'Obsidian.exe',
  },
];

export const Transcripts: React.FC<TranscriptsProps> = ({ onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>('#tx_98a44c');
  const [activeCategory, setActiveCategory] = useState<'all' | 'pinned' | 'code' | 'notes'>('all');
  const [activeDateFilter, setActiveDateFilter] = useState<'today' | 'yesterday' | 'week' | 'custom'>('today');
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedItem = SAMPLE_TRANSCRIPTS.find((t) => t.id === selectedId) || SAMPLE_TRANSCRIPTS[0];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredItems = SAMPLE_TRANSCRIPTS.filter((item) => {
    if (activeCategory === 'pinned' && !item.isPinned) return false;
    if (activeCategory === 'code' && item.category !== 'code') return false;
    if (activeCategory === 'notes' && item.category === 'code') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.text.toLowerCase().includes(q) ||
        item.targetApp.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-[#0E0E10] text-[#E5E1E4] flex flex-col selection:bg-[#5B8CFF]/30">
      {/* Windows Title Bar */}
      <WindowsTitleBar title="VoxFlow" badge="Settings" subtitle="Transcripts & History" />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Windows Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#1B1B1D]/95 backdrop-blur-xl border-b md:border-b-0 md:border-r border-[#2A2A2E] flex flex-col justify-between p-3 shrink-0">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-mono text-[#8D909F] uppercase tracking-wider font-semibold">
              Configuration
            </div>
            <nav className="space-y-1">
              <button
                type="button"
                onClick={() => onNavigate?.('settings')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]"
              >
                <Keyboard size={16} className="text-[#8D909F]" />
                <span>Hotkeys</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('settings')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]"
              >
                <Mic size={16} className="text-[#8D909F]" />
                <span>Audio Devices</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('settings')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]"
              >
                <BrainCircuit size={16} className="text-[#8D909F]" />
                <span>Speech Model</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold bg-[#2A2A2C] text-[#E5E1E4] border-l-2 border-[#5B8CFF] text-left"
              >
                <Database size={16} className="text-[#5B8CFF]" />
                <span>History & Storage</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('brand')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]"
              >
                <Info size={16} className="text-[#8D909F]" />
                <span>About & License</span>
              </button>
            </nav>
          </div>

          {/* Engine Ready indicator */}
          <div className="p-3 bg-[#201F21] rounded-xl border border-[#2A2A2E] flex items-center justify-between mt-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#77DAA4] animate-pulse" />
              <div className="flex flex-col">
                <span className="font-mono text-xs text-[#E5E1E4] font-medium">Engine Ready</span>
                <span className="text-[10px] text-[#8D909F]">Local Whisper v3</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate?.('tray')}
              className="text-[#8D909F] hover:text-[#E5E1E4] p-1 rounded transition-colors"
              title="Open Tray Popup"
            >
              <Sliders size={15} />
            </button>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 bg-[#0E0E10] p-4 lg:p-6 overflow-y-auto flex flex-col gap-4">
          {/* Secondary Context Bar / Filter Strip */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-[#1B1B1D]/80 backdrop-blur-xl p-3.5 rounded-xl border border-[#2A2A2E] shadow-sm">
            {/* Search Input and Date Filters */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative flex-1 max-w-xl">
                <Search size={16} className="absolute left-3 top-2.5 text-[#8D909F]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transcripts, code, tags, or target apps..."
                  className="w-full h-9 pl-9 pr-16 bg-[#0E0E10] text-[#E5E1E4] text-xs rounded-lg focus:outline-none focus:bg-[#201F21] border border-[#2A2A2E] placeholder:text-[#8D909F]"
                />
                <div className="absolute right-2.5 top-2 flex items-center gap-1">
                  <kbd className="font-mono text-[10px] text-[#8D909F] bg-[#201F21] px-1.5 py-0.5 rounded border border-[#2A2A2E]">
                    Ctrl
                  </kbd>
                  <kbd className="font-mono text-[10px] text-[#8D909F] bg-[#201F21] px-1.5 py-0.5 rounded border border-[#2A2A2E]">
                    F
                  </kbd>
                </div>
              </div>

              {/* Date Filter Pills */}
              <div className="hidden xl:flex items-center gap-1 bg-[#0E0E10] p-1 rounded-lg border border-[#2A2A2E]">
                <button
                  type="button"
                  onClick={() => setActiveDateFilter('today')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                    activeDateFilter === 'today'
                      ? 'bg-[#5B8CFF] text-[#001847] font-semibold'
                      : 'text-[#C3C6D6] hover:text-white'
                  }`}
                >
                  Today (8)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDateFilter('yesterday')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                    activeDateFilter === 'yesterday'
                      ? 'bg-[#5B8CFF] text-[#001847] font-semibold'
                      : 'text-[#C3C6D6] hover:text-white'
                  }`}
                >
                  Yesterday (11)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDateFilter('week')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                    activeDateFilter === 'week'
                      ? 'bg-[#5B8CFF] text-[#001847] font-semibold'
                      : 'text-[#C3C6D6] hover:text-white'
                  }`}
                >
                  Last 7 Days
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDateFilter('custom')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                    activeDateFilter === 'custom'
                      ? 'bg-[#5B8CFF] text-[#001847] font-semibold'
                      : 'text-[#C3C6D6] hover:text-white'
                  }`}
                >
                  Custom
                </button>
              </div>
            </div>

            {/* Quick Metrics & Sort */}
            <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0E0E10] rounded-lg border border-[#2A2A2E]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#77DAA4] animate-pulse" />
                <span className="font-mono text-[11px] text-[#C3C6D6]">24 recorded</span>
                <span className="text-[#8D909F] text-xs">•</span>
                <span className="font-mono text-[11px] text-[#E5E1E4]">1,420 words</span>
                <span className="text-[#8D909F] text-xs">•</span>
                <span className="font-mono text-[11px] text-[#77DAA4]">99.4% Whisper acc</span>
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#201F21] hover:bg-[#2A2A2C] rounded-lg text-[#E5E1E4] text-xs transition-colors border border-[#2A2A2E]"
              >
                <SortDesc size={14} className="text-[#8D909F]" />
                <span>Newest first</span>
                <ChevronDown size={14} className="text-[#8D909F]" />
              </button>
            </div>
          </div>

          {/* Main Workspace Split-Pane Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1">
            {/* LEFT PANE: Filter Categories & Transcriptions List (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-[#1B1B1D] p-1.5 rounded-xl border border-[#2A2A2E]">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeCategory === 'all'
                      ? 'bg-[#2A2A2C] text-[#E5E1E4] border border-[#5B8CFF]/30 shadow-sm'
                      : 'text-[#C3C6D6] hover:bg-[#201F21]'
                  }`}
                >
                  <span>All</span>
                  <span className="px-1.5 py-0.2 bg-[#5B8CFF] text-[#001847] rounded-full text-[10px] font-bold">
                    24
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('pinned')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeCategory === 'pinned'
                      ? 'bg-[#2A2A2C] text-[#E5E1E4] border border-[#5B8CFF]/30 shadow-sm'
                      : 'text-[#C3C6D6] hover:bg-[#201F21]'
                  }`}
                >
                  <Star size={13} className="text-[#F7BD4F] fill-current" />
                  <span>Pinned</span>
                  <span className="text-[#8D909F] text-[10px]">4</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('code')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeCategory === 'code'
                      ? 'bg-[#2A2A2C] text-[#E5E1E4] border border-[#5B8CFF]/30 shadow-sm'
                      : 'text-[#C3C6D6] hover:bg-[#201F21]'
                  }`}
                >
                  <Code size={13} />
                  <span>Code</span>
                  <span className="text-[#8D909F] text-[10px]">9</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('notes')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeCategory === 'notes'
                      ? 'bg-[#2A2A2C] text-[#E5E1E4] border border-[#5B8CFF]/30 shadow-sm'
                      : 'text-[#C3C6D6] hover:bg-[#201F21]'
                  }`}
                >
                  <FileText size={13} />
                  <span>Notes</span>
                  <span className="text-[#8D909F] text-[10px]">6</span>
                </button>
              </div>

              {/* Transcription Cards List */}
              <div className="flex flex-col gap-2">
                {filteredItems.map((item) => {
                  const isSelected = item.id === selectedId;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`group relative flex flex-col gap-2 p-3.5 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-[#201F21] border-[#5B8CFF]/60 shadow-md bg-gradient-to-r from-[#5B8CFF]/10 via-[#201F21] to-[#201F21]'
                          : 'bg-[#1B1B1D] border-[#2A2A2E] hover:bg-[#201F21]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`font-mono text-xs font-semibold ${
                              isSelected ? 'text-[#5B8CFF]' : 'text-[#C3C6D6]'
                            }`}
                          >
                            {item.timestamp}
                          </span>
                          <span className="text-[#8D909F] text-xs">•</span>
                          <span className="text-[11px] text-[#8D909F]">{item.relativeTime}</span>
                          <span className="text-[#8D909F] text-xs">•</span>
                          <span className="text-[11px] text-[#8D909F]">
                            {item.wordCount} words
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 bg-[#2A2A2C] text-[#5B8CFF] font-mono text-[10px] rounded border border-[#434653]/30">
                            {item.targetApp}
                          </span>
                          {item.isPinned && (
                            <Star size={13} className="text-[#F7BD4F] fill-current" />
                          )}
                        </div>
                      </div>

                      {/* Card Preview Text */}
                      {item.category === 'code' && item.text.startsWith('git') ? (
                        <div className="p-2 bg-[#0E0E10] rounded font-mono text-[11px] text-[#77DAA4] line-clamp-1 overflow-hidden border border-[#2A2A2E]">
                          {item.text}
                        </div>
                      ) : (
                        <p className="text-xs text-[#E5E1E4] line-clamp-2 leading-relaxed">
                          {item.text}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 font-mono text-[10px] text-[#8D909F]">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[#77DAA4]">
                            <Volume2 size={11} />
                            {item.audioDuration}
                          </span>
                          <span>{item.model}</span>
                        </div>
                        {isSelected && (
                          <span className="text-[#5B8CFF] font-medium flex items-center gap-0.5">
                            Selected
                            <ChevronRight size={13} />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT PANE: Detailed Inspector & Action Workspace (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex flex-col gap-4 p-5 bg-[#1B1B1D] rounded-xl border border-[#2A2A2E] shadow-lg">
                {/* Detail Header & Target App Metadata */}
                <div className="flex flex-col gap-3 pb-3 bg-[#201F21] p-4 rounded-xl border border-[#2A2A2E]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#5B8CFF] text-[#001847] font-mono text-[10px] font-bold rounded">
                          PR Review
                        </span>
                        <span className="font-mono text-xs text-[#8D909F]">
                          ID: {selectedItem.id}
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-[#E5E1E4] tracking-tight truncate">
                        Pull Request Review & WebGL Visualizer
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] text-[#8D909F]">
                        <span className="flex items-center gap-1 text-[#C3C6D6]">
                          <Calendar size={12} />
                          Today at {selectedItem.timestamp}:15
                        </span>
                        <span>•</span>
                        <span>Duration: {selectedItem.audioDuration}</span>
                        <span>•</span>
                        <span>DirectML {selectedItem.model} (110ms)</span>
                      </div>
                    </div>

                    {/* Top utility quick buttons */}
                    <div className="flex items-center gap-1 bg-[#0E0E10] p-1 rounded-lg shrink-0 border border-[#2A2A2E]">
                      <button
                        type="button"
                        className="w-7 h-7 rounded flex items-center justify-center text-[#F7BD4F] hover:bg-[#201F21] transition-colors"
                        title="Favorite"
                      >
                        <Star size={14} className="fill-current" />
                      </button>
                      <button
                        type="button"
                        className="w-7 h-7 rounded flex items-center justify-center text-[#8D909F] hover:text-[#E5E1E4] hover:bg-[#201F21] transition-colors"
                        title="Export Markdown"
                      >
                        <Download size={14} />
                      </button>
                      <button
                        type="button"
                        className="w-7 h-7 rounded flex items-center justify-center text-[#8D909F] hover:text-[#E8544E] hover:bg-[#201F21] transition-colors"
                        title="Delete transcript"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Injected Target App Info Tag */}
                  <div className="flex items-center justify-between p-2.5 bg-[#0E0E10] rounded-lg border border-[#2A2A2E]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#2A2A2C] flex items-center justify-center text-[#5B8CFF]">
                        <Terminal size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-[#E5E1E4]">
                          Target Window: {selectedItem.targetProcess || 'Code - Insiders.exe'}
                        </span>
                        <span className="text-[10px] text-[#8D909F]">
                          Direct virtual keystroke injection • 0ms UI blocking
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 bg-[#77DAA4]/10 text-[#77DAA4] rounded border border-[#77DAA4]/20 font-medium">
                      Synthesized & Typed
                    </span>
                  </div>
                </div>

                {/* Main Transcript Content Box */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#8D909F] tracking-wider uppercase font-semibold">
                      Transcript Output (Cleaned)
                    </span>
                    <span className="text-[11px] text-[#77DAA4] flex items-center gap-1 font-mono">
                      <Sparkles size={12} />
                      Ollama llama3.2:3b formatting applied
                    </span>
                  </div>

                  {/* Elevated Typography Canvas */}
                  <div className="p-4 bg-[#0E0E10] rounded-xl border border-[#2A2A2E] shadow-inner">
                    <p className="text-sm text-[#E5E1E4] leading-relaxed select-text font-normal">
                      "Please review the updated pull request on{' '}
                      <span className="text-[#5B8CFF] font-semibold">GitHub</span> and verify the{' '}
                      <span className="font-mono text-xs bg-[#2A2A2C] px-1.5 py-0.5 rounded text-[#77DAA4] border border-[#434653]/40">
                        WebGL audio visualizer
                      </span>{' '}
                      shader pipeline before Friday deployment. Let's make sure the audio loopback
                      device handles 48 kHz float buffers gracefully."
                    </p>

                    {/* Raw Whisper Token View Accordion */}
                    <div className="mt-4 pt-3 border-t border-[#2A2A2E]">
                      <button
                        type="button"
                        onClick={() => setShowTokens(!showTokens)}
                        className="font-mono text-[11px] text-[#8D909F] hover:text-[#E5E1E4] flex items-center gap-1.5 transition-colors"
                      >
                        <ChevronRight
                          size={13}
                          className={`transition-transform ${showTokens ? 'rotate-90' : ''}`}
                        />
                        <span>View raw unformatted Whisper tokens & confidence scores</span>
                      </button>

                      {showTokens && (
                        <div className="mt-2.5 font-mono text-[11px] text-[#8D909F] bg-[#1B1B1D] p-3 rounded-lg border border-[#2A2A2E] space-y-1">
                          <div>[0.0s -&gt; 1.4s] "please review the updated" (conf: 0.998)</div>
                          <div>[1.4s -&gt; 3.1s] "pull request on git hub and verify the" (conf: 0.991)</div>
                          <div>[3.1s -&gt; 4.8s] "web gl audio visualizer shader pipeline" (conf: 0.984)</div>
                          <div>[4.8s -&gt; 6.2s] "before friday deployment" (conf: 0.996)</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Audio Waveform Player Bar Component */}
                <div className="flex flex-col gap-2 p-3.5 bg-[#201F21] rounded-xl border border-[#2A2A2E]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-8 h-8 rounded-full bg-[#5B8CFF] text-[#001847] flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                      >
                        {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                      </button>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-[#E5E1E4]">
                          6.2s Audio Sample
                        </span>
                        <span className="text-[10px] text-[#8D909F]">
                          Input: HyperX SoloCast (-18.4 dB peak)
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#8D909F]">
                      {isPlaying ? '0:03.4' : '0:00.0'} / 0:06.2
                    </span>
                  </div>

                  {/* Waveform Visualization (Decibel bars from design specs) */}
                  <div className="h-10 w-full bg-[#0E0E10] rounded-lg flex items-center px-3 gap-1 overflow-hidden relative border border-[#2A2A2E]">
                    {/* Animated scrub progress marker */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-[#5B8CFF] z-10 transition-all duration-300"
                      style={{ left: isPlaying ? '55%' : '22%' }}
                    />
                    {[
                      3, 4, 6, 8, 7, 5, 8, 9, 6, 3, 2, 4, 7, 8, 9, 7, 5, 8, 6, 4, 7, 8, 5, 3, 2, 5, 8, 4, 2,
                    ].map((height, i) => {
                      const isPast = i < (isPlaying ? 16 : 6);
                      return (
                        <div
                          key={i}
                          style={{ height: `${height * 3.5}px` }}
                          className={`w-1 rounded-full transition-all duration-150 ${
                            isPast ? 'bg-[#5B8CFF]' : 'bg-[#434653]'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Primary Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 bg-[#5B8CFF] text-[#001847] font-semibold text-xs rounded-lg hover:opacity-95 active:scale-[0.98] transition-all shadow-sm"
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3.5 py-2 bg-[#201F21] hover:bg-[#2A2A2C] text-[#E5E1E4] text-xs font-medium rounded-lg transition-colors border border-[#2A2A2E]"
                    >
                      <ExternalLink size={15} className="text-[#8D909F]" />
                      <span>Paste into VS Code</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#201F21] hover:bg-[#2A2A2C] text-[#E5E1E4] text-xs rounded-lg transition-colors border border-[#2A2A2E]"
                  >
                    <Sparkles size={14} className="text-[#77DAA4]" />
                    <span>Re-run Ollama Polish</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Windows Fluent Sticky System Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2.5 bg-[#1B1B1D]/90 backdrop-blur-md rounded-xl text-xs font-mono text-[#8D909F] border border-[#2A2A2E]">
            <div className="flex items-center gap-2 min-w-0">
              <Lock size={14} className="text-[#77DAA4]" />
              <span className="truncate">
                Air-gapped Local Engine • C:\Users\Dev\AppData\Roaming\VoxFlow\transcripts.db
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                className="hover:text-[#E5E1E4] transition-colors flex items-center gap-1"
              >
                <Download size={13} />
                <span>Batch Export (JSON / Markdown)</span>
              </button>
              <span>•</span>
              <button
                type="button"
                className="hover:text-[#E8544E] transition-colors flex items-center gap-1"
              >
                <Trash2 size={13} />
                <span>Purge Old (30+ days)</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
