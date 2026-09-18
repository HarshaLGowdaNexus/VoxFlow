import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  Mic,
  BrainCircuit,
  Database,
  Info,
  Sliders,
  Check,
  Search,
  Volume2,
  Lock,
  Download,
  Trash2,
  ShieldCheck,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { WindowsTitleBar } from './common/WindowsTitleBar';

interface SettingsProps {
  onNavigate?: (screen: 'tray' | 'transcripts' | 'brand') => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const [activeNav, setActiveNav] = useState<'hotkeys' | 'audio' | 'model' | 'storage' | 'about'>('hotkeys');
  const [activeTab, setActiveTab] = useState<'hotkey-panel' | 'audio-panel' | 'model-panel' | 'privacy-panel' | 'system-panel'>('hotkey-panel');
  const [activationMode, setActivationMode] = useState<'push' | 'toggle'>('push');
  const [isRecordingKey, setIsRecordingKey] = useState(false);
  const [isTestingMic, setIsTestingMic] = useState(false);
  const [gain, setGain] = useState(82);
  const [sileroVad, setSileroVad] = useState(true);
  const [rnnoise, setRnnoise] = useState(true);
  const [sqliteHistory, setSqliteHistory] = useState(true);
  const [selectedModel, setSelectedModel] = useState<'tiny' | 'base' | 'small' | 'turbo'>('small');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedFeedback, setAppliedFeedback] = useState(false);
  const [meterLevel, setMeterLevel] = useState(7);

  // Settings state
  const [hotkey, setHotkey] = useState('CommandOrControl+Shift+Space');
  const [micDevice, setMicDevice] = useState('default');
  const [ollamaModel, setOllamaModel] = useState('llama3');
  const [ollamaModelsList, setOllamaModelsList] = useState<string[]>([]);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getSettings().then((s: any) => {
        setHotkey(s.hotkey || 'CommandOrControl+Shift+Space');
        setMicDevice(s.micDevice || 'default');
        setSelectedModel(s.whisperModel || 'small.en');
        setOllamaModel(s.ollamaModel || 'llama3');
      });
      window.electronAPI.getOllamaModels().then((models: string[]) => {
        setOllamaModelsList(models);
      });
    }
  }, []);

  const updateSetting = (key: string, value: any) => {
    if (window.electronAPI) {
      window.electronAPI.setSetting(key, value);
    }
    if (key === 'hotkey') setHotkey(value);
    if (key === 'micDevice') setMicDevice(value);
    if (key === 'whisperModel') setSelectedModel(value);
    if (key === 'ollamaModel') setOllamaModel(value);
  };

  // Simulated mic meter animation when testing
  useEffect(() => {
    if (!isTestingMic) {
      setMeterLevel(7);
      return;
    }
    const timer = setInterval(() => {
      setMeterLevel(Math.floor(Math.random() * 6) + 5);
    }, 120);
    return () => clearInterval(timer);
  }, [isTestingMic]);

  const handleApply = () => {
    setAppliedFeedback(true);
    setTimeout(() => setAppliedFeedback(false), 2000);
  };

  const handleRecordKey = () => {
    setIsRecordingKey(true);
    setTimeout(() => setIsRecordingKey(false), 2500);
  };

  return (
    <div className="w-full min-h-screen bg-[#0E0E10] text-[#E5E1E4] flex flex-col selection:bg-[#5B8CFF]/30">
      {/* Windows Title Bar */}
      <WindowsTitleBar title="VoxFlow" badge="Settings" />

      {/* Main Two-Column Desktop Layout */}
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
                onClick={() => {
                  setActiveNav('hotkeys');
                  setActiveTab('hotkey-panel');
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                  activeNav === 'hotkeys'
                    ? 'bg-[#2A2A2C] text-[#E5E1E4] font-semibold border-l-2 border-[#5B8CFF]'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <Keyboard size={16} className={activeNav === 'hotkeys' ? 'text-[#5B8CFF]' : 'text-[#8D909F]'} />
                <span>Hotkeys</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveNav('audio');
                  setActiveTab('audio-panel');
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                  activeNav === 'audio'
                    ? 'bg-[#2A2A2C] text-[#E5E1E4] font-semibold border-l-2 border-[#5B8CFF]'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <Mic size={16} className={activeNav === 'audio' ? 'text-[#5B8CFF]' : 'text-[#8D909F]'} />
                <span>Audio Devices</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveNav('model');
                  setActiveTab('model-panel');
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                  activeNav === 'model'
                    ? 'bg-[#2A2A2C] text-[#E5E1E4] font-semibold border-l-2 border-[#5B8CFF]'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <BrainCircuit size={16} className={activeNav === 'model' ? 'text-[#5B8CFF]' : 'text-[#8D909F]'} />
                <span>Speech Model</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveNav('storage');
                  onNavigate?.('transcripts');
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                  activeNav === 'storage'
                    ? 'bg-[#2A2A2C] text-[#E5E1E4] font-semibold border-l-2 border-[#5B8CFF]'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <Database size={16} className={activeNav === 'storage' ? 'text-[#5B8CFF]' : 'text-[#8D909F]'} />
                <span>History & Storage</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveNav('about');
                  onNavigate?.('brand');
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                  activeNav === 'about'
                    ? 'bg-[#2A2A2C] text-[#E5E1E4] font-semibold border-l-2 border-[#5B8CFF]'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <Info size={16} className={activeNav === 'about' ? 'text-[#5B8CFF]' : 'text-[#8D909F]'} />
                <span>About & License</span>
              </button>
            </nav>
          </div>

          {/* Engine Ready Indicator */}
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

        {/* Right Main Settings Workspace */}
        <main className="flex-1 bg-[#0E0E10] p-4 lg:p-6 overflow-y-auto">
          {/* Top Settings Bar & Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#5B8CFF] font-semibold">
                  System Preferences
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2A2A2C] text-[#77DAA4] font-mono text-[11px] border border-[#77DAA4]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#77DAA4] animate-ping" />
                  Local Engine: Ready (12ms latency)
                </span>
              </div>
              <h1 className="text-xl font-bold text-[#E5E1E4] tracking-tight mt-1">
                Desktop Dictation Settings
              </h1>
            </div>

            {/* Quick Finder Search */}
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3 top-2.5 text-[#8D909F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter settings or shortcuts..."
                className="w-full h-9 pl-9 pr-14 bg-[#1B1B1D] text-[#E5E1E4] text-xs rounded-lg focus:outline-none focus:bg-[#201F21] border border-[#2A2A2E] placeholder:text-[#8D909F]"
              />
              <span className="absolute right-2.5 top-2 px-1.5 py-0.5 rounded bg-[#2A2A2C] font-mono text-[10px] text-[#8D909F]">
                Ctrl+K
              </span>
            </div>
          </div>

          {/* Sub Navigation Tabs + Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sub Nav Tabs */}
            <nav className="lg:col-span-3 flex lg:flex-col gap-1 p-1 bg-[#1B1B1D] rounded-xl border border-[#2A2A2E] sticky top-4">
              <button
                type="button"
                onClick={() => setActiveTab('hotkey-panel')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs transition-all ${
                  activeTab === 'hotkey-panel'
                    ? 'bg-[#2A2A2C] text-[#5B8CFF] font-semibold shadow-sm border border-[#5B8CFF]/20'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Keyboard size={15} />
                  <span>Hotkeys</span>
                </div>
                <span className="font-mono text-[11px] text-[#5B8CFF]/80">{hotkey.replace('CommandOrControl', 'Ctrl')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('audio-panel')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs transition-all ${
                  activeTab === 'audio-panel'
                    ? 'bg-[#2A2A2C] text-[#5B8CFF] font-semibold shadow-sm border border-[#5B8CFF]/20'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mic size={15} />
                  <span>Audio & VAD</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#77DAA4]" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('model-panel')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs transition-all ${
                  activeTab === 'model-panel'
                    ? 'bg-[#2A2A2C] text-[#5B8CFF] font-semibold shadow-sm border border-[#5B8CFF]/20'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BrainCircuit size={15} />
                  <span>Speech Engine</span>
                </div>
                <span className="font-mono text-[10px] text-[#8D909F]">v3-Small</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('privacy-panel')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs transition-all ${
                  activeTab === 'privacy-panel'
                    ? 'bg-[#2A2A2C] text-[#5B8CFF] font-semibold shadow-sm border border-[#5B8CFF]/20'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Lock size={15} />
                  <span>History & Privacy</span>
                </div>
                <span className="font-mono text-[10px] text-[#77DAA4]">Offline</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate?.('tray')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs transition-all ${
                  activeTab === 'system-panel'
                    ? 'bg-[#2A2A2C] text-[#5B8CFF] font-semibold shadow-sm'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sliders size={15} />
                  <span>System & Tray</span>
                </div>
              </button>
            </nav>

            {/* Sections Container */}
            <div className="lg:col-span-9 flex flex-col gap-6">
              {/* SECTION 1: Hotkeys & Global Trigger */}
              {activeTab === 'hotkey-panel' && (
              <section className="flex flex-col bg-[#1B1B1D] rounded-xl p-5 border border-[#2A2A2E] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <Keyboard size={18} className="text-[#5B8CFF]" />
                    <h2 className="font-semibold text-sm text-[#E5E1E4]">
                      Global Trigger Combination
                    </h2>
                  </div>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#77DAA4] bg-[#201F21] px-2.5 py-1 rounded-md border border-[#77DAA4]/20">
                    <ShieldCheck size={13} />
                    No system conflicts (Win32 Hook)
                  </span>
                </div>

                {/* Keycap Recorder Canvas */}
                <div className="p-4 bg-[#201F21] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#2A2A2E]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <kbd className="px-3 py-1.5 rounded bg-[#2A2A2C] text-[#E5E1E4] font-mono text-xs shadow-sm border border-[#434653]/40">
                      {hotkey}
                    </kbd>
                  </div>
                  <button
                    type="button"
                    disabled
                    className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-[#2A2A2C] text-[#8D909F] text-xs flex items-center justify-center gap-2 border border-[#434653]/40 cursor-not-allowed opacity-70"
                  >
                    <span>Click to record new</span>
                    <span className="font-mono text-[9px] bg-[#201F21] px-1 py-0.5 rounded ml-1 text-[#5B8CFF]">Coming Soon</span>
                  </button>
                </div>

                {/* Behavior Modes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <label
                    className={`relative flex items-start gap-3 p-3.5 rounded-lg cursor-pointer transition-colors border ${
                      activationMode === 'push'
                        ? 'bg-[#201F21] border-[#5B8CFF]/50 shadow-sm'
                        : 'bg-[#201F21]/60 border-[#2A2A2E] hover:bg-[#201F21]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="activation-mode"
                      checked={activationMode === 'push'}
                      onChange={() => setActivationMode('push')}
                      className="mt-1 accent-[#5B8CFF] h-4 w-4"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-[#E5E1E4]">Push to Talk</span>
                      <span className="text-[11px] text-[#C3C6D6] mt-0.5 leading-relaxed">
                        Hold shortcut to stream audio. Release instantly to synthesize & inject
                        clipboard text.
                      </span>
                      <span className="mt-2 text-[#5B8CFF] font-mono text-[10px] font-medium">
                        Recommended for fast dictation
                      </span>
                    </div>
                  </label>

                  <label
                    className={`relative flex items-start gap-3 p-3.5 rounded-lg cursor-pointer transition-colors border ${
                      activationMode === 'toggle'
                        ? 'bg-[#201F21] border-[#5B8CFF]/50 shadow-sm'
                        : 'bg-[#201F21]/60 border-[#2A2A2E] hover:bg-[#201F21]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="activation-mode"
                      checked={activationMode === 'toggle'}
                      onChange={() => setActivationMode('toggle')}
                      className="mt-1 accent-[#5B8CFF] h-4 w-4"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-[#E5E1E4]">
                        Hands-Free Toggle
                      </span>
                      <span className="text-[11px] text-[#C3C6D6] mt-0.5 leading-relaxed">
                        Tap once to begin listening HUD, tap again or pause speaking to finalize.
                      </span>
                      <span className="mt-2 text-[#8D909F] font-mono text-[10px]">
                        Best with long-form writing
                      </span>
                    </div>
                  </label>
                </div>

                {/* Abort Shortcut */}
                <div className="flex items-center justify-between mt-3 bg-[#201F21]/60 px-3.5 py-2.5 rounded-lg border border-[#2A2A2E]">
                  <span className="text-xs text-[#C3C6D6]">
                    Cancel active recording immediately:
                  </span>
                  <kbd className="px-2 py-0.5 rounded bg-[#2A2A2C] text-[#E5E1E4] font-mono text-[11px] border border-[#434653]/30">
                    Esc
                  </kbd>
                </div>
              </section>
              )}

              {/* SECTION 2: Audio Device & Live Calibration */}
              {activeTab === 'audio-panel' && (
              <section className="flex flex-col bg-[#1B1B1D] rounded-xl p-5 border border-[#2A2A2E] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <Mic size={18} className="text-[#5B8CFF]" />
                    <h2 className="font-semibold text-sm text-[#E5E1E4]">
                      Input Audio & VAD Sensors
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#77DAA4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#77DAA4]" />
                    <span>WASAPI Active</span>
                  </div>
                </div>

                {/* Device Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center mb-4">
                  <label className="text-xs text-[#E5E1E4] font-medium">Capture Device</label>
                  <div className="sm:col-span-2 relative">
                    <select className="w-full h-9 pl-3 pr-8 bg-[#201F21] text-[#E5E1E4] text-xs rounded-lg appearance-none cursor-pointer focus:outline-none border border-[#2A2A2E]">
                      <option>HyperX QuadCast S (WASAPI Exclusive, 48kHz)</option>
                      <option>Microphone Array (Realtek High Definition Audio)</option>
                      <option>Virtual Cable Audio Capture (DirectSound)</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-2.5 top-2.5 pointer-events-none text-[#8D909F]"
                    />
                  </div>
                </div>

                {/* Live Decibel Level Meter */}
                <div className="bg-[#201F21] p-4 rounded-lg flex flex-col gap-2.5 mb-4 border border-[#2A2A2E]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#C3C6D6]">
                      Live Decibel Level (-48dB ~ 0dB)
                    </span>
                    <span className="font-mono text-[11px] text-[#77DAA4]">
                      {isTestingMic ? '-14.2 dB (Speaking)' : '-18.4 dB (Optimal)'}
                    </span>
                  </div>

                  {/* Segmented LED Bar */}
                  <div className="w-full h-3 bg-[#0E0E10] rounded-full p-0.5 flex gap-1 overflow-hidden border border-[#2A2A2E]">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((seg) => {
                      const isActive = seg < meterLevel;
                      let color = 'bg-[#2A2A2C]';
                      if (isActive) {
                        if (seg < 7) color = 'bg-[#77DAA4]';
                        else if (seg < 10) color = 'bg-[#F7BD4F]';
                        else color = 'bg-[#E8544E]';
                      }
                      return (
                        <div
                          key={seg}
                          className={`flex-1 rounded-sm transition-all duration-75 ${color}`}
                        />
                      );
                    })}
                  </div>

                  <div className="flex justify-between font-mono text-[10px] text-[#8D909F] px-0.5">
                    <span>-48 dB</span>
                    <span>-24 dB</span>
                    <span>-12 dB</span>
                    <span>-6 dB</span>
                    <span>0 dB</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2E]/60 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsTestingMic(!isTestingMic)}
                        className={`px-3 py-1 text-xs rounded flex items-center gap-1.5 transition-colors ${
                          isTestingMic
                            ? 'bg-[#5B8CFF] text-[#001847] font-semibold'
                            : 'bg-[#2A2A2C] hover:bg-[#353437] text-[#E5E1E4] border border-[#434653]/30'
                        }`}
                      >
                        <Volume2 size={13} />
                        <span>{isTestingMic ? 'Stop Test' : 'Test Microphone'}</span>
                      </button>
                      <span className="text-[10px] text-[#8D909F]">Loopback playback disabled</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#C3C6D6]">Gain:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={gain}
                        onChange={(e) => setGain(Number(e.target.value))}
                        className="w-24 h-1.5 bg-[#2A2A2C] rounded-lg accent-[#5B8CFF] cursor-pointer"
                      />
                      <span className="font-mono text-xs text-[#E5E1E4] w-8 text-right">
                        {gain}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* VAD & Noise Cancellation Toggles */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#201F21] border border-[#2A2A2E]">
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-[#E5E1E4]">
                        Intelligent Voice Activity Detection (Silero VAD v4)
                      </span>
                      <span className="text-[11px] text-[#8D909F] mt-0.5">
                        Cuts dead silence before passing frames to local neural pipeline. Prevents
                        hallucination.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSileroVad(!sileroVad)}
                      className={`relative w-9 h-5 rounded-full transition-colors ${
                        sileroVad ? 'bg-[#5B8CFF]' : 'bg-[#2A2A2C]'
                      }`}
                    >
                      <div
                        className={`absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-[#001847] transition-transform ${
                          sileroVad ? 'translate-x-4 bg-white' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#201F21] border border-[#2A2A2E]">
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-[#E5E1E4]">
                        Background Hum & Fan Suppression (RNNoise)
                      </span>
                      <span className="text-[11px] text-[#8D909F] mt-0.5">
                        Real-time spectral subtraction targeting mechanical keyboards and PC
                        chassis fans.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRnnoise(!rnnoise)}
                      className={`relative w-9 h-5 rounded-full transition-colors ${
                        rnnoise ? 'bg-[#5B8CFF]' : 'bg-[#2A2A2C]'
                      }`}
                    >
                      <div
                        className={`absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-[#001847] transition-transform ${
                          rnnoise ? 'translate-x-4 bg-white' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </section>
              )}

              {/* SECTION 3: Whisper Model & Local LLM */}
              {activeTab === 'model-panel' && (
              <section className="flex flex-col bg-[#1B1B1D] rounded-xl p-5 border border-[#2A2A2E] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <BrainCircuit size={18} className="text-[#5B8CFF]" />
                    <h2 className="font-semibold text-sm text-[#E5E1E4]">
                      Whisper Model & Local LLM Post-Processor
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] bg-[#201F21] text-[#8D909F] px-2 py-0.5 rounded border border-[#2A2A2E]">
                    Vulkan / DirectML
                  </span>
                </div>

                {/* Model Matrix Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 mb-4">
                  {/* Tiny */}
                  <div
                    onClick={() => updateSetting('whisperModel', 'tiny')}
                    className={`p-3 rounded-lg flex flex-col justify-between cursor-pointer transition-colors border ${
                      selectedModel === 'tiny'
                        ? 'bg-[#2A2A2C] border-[#5B8CFF]'
                        : 'bg-[#201F21] border-[#2A2A2E] hover:bg-[#2A2A2C]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-xs text-[#E5E1E4]">Tiny</span>
                        <span className="font-mono text-[10px] text-[#8D909F]">75MB</span>
                      </div>
                      <p className="text-[11px] text-[#8D909F] mt-1 leading-normal">
                        Fastest inference. High speed on low-power ultrabooks.
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#8D909F]">~35ms</span>
                      <span className="text-[#77DAA4]">Downloaded</span>
                    </div>
                  </div>

                  {/* Base.en */}
                  <div
                    onClick={() => updateSetting('whisperModel', 'base.en')}
                    className={`p-3 rounded-lg flex flex-col justify-between cursor-pointer transition-colors border ${
                      selectedModel === 'base.en'
                        ? 'bg-[#2A2A2C] border-[#5B8CFF]'
                        : 'bg-[#201F21] border-[#2A2A2E] hover:bg-[#2A2A2C]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-xs text-[#E5E1E4]">Base</span>
                        <span className="font-mono text-[10px] text-[#8D909F]">140MB</span>
                      </div>
                      <p className="text-[11px] text-[#8D909F] mt-1 leading-normal">
                        Balanced lightweight option with sound punctuation.
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#8D909F]">~60ms</span>
                      <span className="text-[#8D909F]">Ready</span>
                    </div>
                  </div>

                  {/* Small.en */}
                  <div
                    onClick={() => updateSetting('whisperModel', 'small.en')}
                    className={`p-3 rounded-lg flex flex-col justify-between cursor-pointer border shadow-sm ${
                      selectedModel === 'small.en'
                        ? 'bg-[#2A2A2C] border-[#5B8CFF]'
                        : 'bg-[#201F21] border-[#2A2A2E] hover:bg-[#2A2A2C]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-xs text-[#5B8CFF]">Small</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#5B8CFF] text-[#001847] font-mono text-[10px] font-bold">
                          Current
                        </span>
                      </div>
                      <p className="text-[11px] text-[#C3C6D6] mt-1 leading-normal">
                        Recommended. Superb vocabulary accuracy with jargon & names.
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#C3C6D6]">~110ms</span>
                      <span className="text-[#77DAA4]">Primed in VRAM</span>
                    </div>
                  </div>

                  {/* Medium.en */}
                  <div
                    onClick={() => updateSetting('whisperModel', 'medium.en')}
                    className={`p-3 rounded-lg flex flex-col justify-between cursor-pointer transition-colors border ${
                      selectedModel === 'medium.en'
                        ? 'bg-[#2A2A2C] border-[#5B8CFF]'
                        : 'bg-[#201F21] border-[#2A2A2E] hover:bg-[#2A2A2C]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-xs text-[#E5E1E4]">Medium</span>
                        <span className="font-mono text-[10px] text-[#8D909F]">1.5GB</span>
                      </div>
                      <p className="text-[11px] text-[#8D909F] mt-1 leading-normal">
                        Maximum precision across 99 multi-lingual dialects.
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#8D909F]">~190ms</span>
                      <button type="button" className="text-[#5B8CFF] hover:underline">
                        Fetch (800MB)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ollama Local LLM Fallback */}
                <div className="p-4 bg-[#201F21] rounded-lg flex flex-col gap-3 border border-[#2A2A2E]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-[#F7BD4F]" />
                      <span className="font-semibold text-xs text-[#E5E1E4]">
                        Ollama Local LLM Fallback (Grammar & Auto-Punctuation)
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#77DAA4] bg-[#2A2A2C] px-2 py-0.5 rounded border border-[#434653]/30">
                      http://localhost:11434
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                    <label className="text-xs text-[#C3C6D6]">Formatter Model</label>
                    <div className="sm:col-span-2 relative">
                      <select 
                        value={ollamaModel}
                        onChange={(e) => updateSetting('ollamaModel', e.target.value)}
                        className="w-full h-8 pl-3 pr-8 bg-[#1B1B1D] text-[#E5E1E4] text-xs rounded appearance-none cursor-pointer focus:outline-none border border-[#2A2A2E]">
                        <option value="">Disable LLM Post-Processing (Raw transcription only)</option>
                        {ollamaModelsList.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <ChevronDown
                        size={15}
                        className="absolute right-2.5 top-2 pointer-events-none text-[#8D909F]"
                      />
                    </div>
                  </div>
                </div>
              </section>
              )}

              {/* SECTION 4: Zero-Cloud Retention & Data Policy */}
              {activeTab === 'privacy-panel' && (
              <section className="flex flex-col bg-[#1B1B1D] rounded-xl p-5 border border-[#2A2A2E] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <Lock size={18} className="text-[#5B8CFF]" />
                    <h2 className="font-semibold text-sm text-[#E5E1E4]">
                      Zero-Cloud Retention & Data Policy
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#77DAA4]/10 text-[#77DAA4] font-semibold flex items-center gap-1.5 border border-[#77DAA4]/20">
                    <ShieldCheck size={13} />
                    Air-Gapped Operation
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#201F21] rounded-lg border border-[#2A2A2E]">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#E5E1E4]">
                          Enable Local SQLite History
                        </span>
                        <span className="font-mono text-[10px] text-[#8D909F]">
                          4.2 MB used (~2,410 phrases)
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8D909F] mt-0.5">
                        Saves transcriptions into encrypted user appdata (%APPDATA%\VoxFlow\history.db).
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSqliteHistory(!sqliteHistory)}
                      className={`relative w-9 h-5 rounded-full transition-colors ${
                        sqliteHistory ? 'bg-[#5B8CFF]' : 'bg-[#2A2A2C]'
                      }`}
                    >
                      <div
                        className={`absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-[#001847] transition-transform ${
                          sqliteHistory ? 'translate-x-4 bg-white' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#201F21] rounded-lg border border-[#2A2A2E]">
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-[#E5E1E4]">
                        Zero Cloud Telemetry & Audio Logging
                      </span>
                      <span className="text-[11px] text-[#8D909F] mt-0.5">
                        No network sockets are opened for audio payload processing. Everything
                        stays on host silicon.
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#77DAA4] bg-[#2A2A2C] px-2.5 py-1 rounded border border-[#434653]/30">
                      Enforced Hardwired
                    </span>
                  </div>
                </div>

                {/* History Action Buttons */}
                <div className="flex items-center justify-between pt-4 mt-2 flex-wrap gap-2 border-t border-[#2A2A2E]/60">
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg bg-[#201F21] hover:bg-[#2A2A2C] text-[#E5E1E4] text-xs flex items-center gap-1.5 transition-colors border border-[#2A2A2E]"
                  >
                    <Download size={14} className="text-[#8D909F]" />
                    <span>Export History (JSON / Markdown)</span>
                  </button>
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg bg-[#93000A]/30 hover:bg-[#93000A] text-[#FFDAD6] text-xs flex items-center gap-1.5 transition-colors border border-[#FFB4AB]/20"
                  >
                    <Trash2 size={14} />
                    <span>Purge All Local Records</span>
                  </button>
                </div>
              </section>
              )}
            </div>
          </div>

          {/* Bottom Native Action Bar */}
          <div className="mt-8 p-3.5 bg-[#1B1B1D] rounded-xl flex items-center justify-between shadow-lg sticky bottom-2 z-30 border border-[#2A2A2E]">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-[11px] text-[#8D909F]">
                VoxFlow Desktop v1.4.2 (x64 Windows 11 Build 22631)
              </span>
              <span className="w-1 h-1 rounded-full bg-[#8D909F]" />
              <span className="font-mono text-[11px] text-[#77DAA4]">DirectML Backend OK</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-1.5 rounded-lg bg-[#201F21] hover:bg-[#2A2A2C] text-[#E5E1E4] text-xs transition-colors border border-[#2A2A2E]"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleApply}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                  appliedFeedback
                    ? 'bg-[#003821] text-[#93F7BF] border border-[#3EA271]'
                    : 'bg-[#5B8CFF] text-[#001847] hover:brightness-105 active:brightness-95'
                }`}
              >
                <Check size={14} />
                <span>{appliedFeedback ? 'Applied!' : 'Apply Changes'}</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
