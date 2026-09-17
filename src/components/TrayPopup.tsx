import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Square,
  Sparkles,
  ClipboardPaste,
  Pin,
  Sliders,
  FileText,
  Code2,
  Radio,
  Cpu,
  Gauge,
  X,
  CheckCircle2,
  Volume2,
  RefreshCw,
  Keyboard,
  Circle,
} from 'lucide-react';
import { WindowsTitleBar } from './common/WindowsTitleBar';
import { TrayEngineState } from '../types';

interface TrayPopupProps {
  onNavigate?: (screen: 'settings' | 'transcripts' | 'brand') => void;
}

export const TrayPopup: React.FC<TrayPopupProps> = ({ onNavigate }) => {
  const [engineState, setEngineState] = useState<TrayEngineState>('idle');
  const [activeTab, setActiveTab] = useState<'dictate' | 'notes' | 'snippets' | 'live'>('dictate');
  const [showErrorToast, setShowErrorToast] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(true);

  return (
    <div className="w-full flex flex-col items-center justify-start py-6 px-4 selection:bg-[#5B8CFF]/30">
      {/* State Switcher Controller (For Reviewer/Developer testing of all 3 states) */}
      <section className="w-full max-w-[420px] mb-3 bg-[#1B1B1D] rounded-xl p-1.5 flex items-center justify-between gap-1 shadow-md border border-[#2A2A2E]">
        <span className="text-[11px] text-[#8D909F] px-2 flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5B8CFF] animate-ping" />
          State Preview:
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setEngineState('idle')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-150 flex items-center gap-1.5 ${
              engineState === 'idle'
                ? 'bg-[#5B8CFF] text-[#001847] font-semibold shadow-sm'
                : 'text-[#C3C6D6] hover:text-white hover:bg-[#201F21]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                engineState === 'idle' ? 'bg-[#001847]' : 'bg-[#77DAA4]'
              }`}
            />
            Idle
          </button>
          <button
            type="button"
            onClick={() => setEngineState('recording')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-150 flex items-center gap-1.5 ${
              engineState === 'recording'
                ? 'bg-[#5B8CFF] text-[#001847] font-semibold shadow-sm'
                : 'text-[#C3C6D6] hover:text-white hover:bg-[#201F21]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                engineState === 'recording' ? 'bg-[#001847] animate-ping' : 'bg-[#5B8CFF]'
              }`}
            />
            Recording
          </button>
          <button
            type="button"
            onClick={() => setEngineState('processing')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-150 flex items-center gap-1.5 ${
              engineState === 'processing'
                ? 'bg-[#F7BD4F] text-[#392600] font-semibold shadow-sm'
                : 'text-[#C3C6D6] hover:text-white hover:bg-[#201F21]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                engineState === 'processing' ? 'bg-[#392600]' : 'bg-[#F7BD4F]'
              }`}
            />
            Processing
          </button>
        </div>
      </section>

      {/* Main Tray Utility Window Frame */}
      <div className="w-full max-w-[420px] bg-[#1B1B1D] rounded-xl overflow-hidden shadow-2xl border border-[#2A2A2E] flex flex-col">
        {/* Windows 11 Chrome */}
        <WindowsTitleBar title="VoxFlow" badge="v1.4.2" subtitle="Tray Popup" compact />

        {/* Utility Sub-Header & Status Ribbon */}
        <div className="px-4 py-2.5 bg-[#201F21] border-b border-[#2A2A2E] flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-[#2A2A2C] flex items-center justify-center shrink-0 text-[#5B8CFF]">
              <Volume2 size={14} />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-xs text-[#E5E1E4] truncate">
                  VoxFlow Tray Utility
                </span>
                <span className="font-mono text-[10px] text-[#8D909F]">v1.4.2</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#77DAA4]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#77DAA4]" />
                <span className="text-[11px] text-[#77DAA4] font-medium tracking-wide">
                  Local Engine Ready
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-7 h-7 rounded-lg bg-[#2A2A2C] hover:bg-[#353437] flex items-center justify-center text-[#C3C6D6] transition-colors"
              title="Pin to Desktop"
            >
              <Pin size={13} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('settings')}
              className="w-7 h-7 rounded-lg bg-[#2A2A2C] hover:bg-[#353437] flex items-center justify-center text-[#C3C6D6] transition-colors"
              title="Quick Settings"
            >
              <Sliders size={13} />
            </button>
          </div>
        </div>

        {/* Mode Tabs (Windows 11 Mica Segmented Control) */}
        <div className="px-3 pt-2.5 bg-[#1B1B1D]">
          <div className="grid grid-cols-4 gap-1 p-1 bg-[#201F21] rounded-lg border border-[#2A2A2E]/60">
            <button
              type="button"
              onClick={() => setActiveTab('dictate')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs transition-all ${
                activeTab === 'dictate'
                  ? 'bg-[#2A2A2C] text-[#5B8CFF] font-medium shadow-sm border border-[#434653]/30'
                  : 'text-[#C3C6D6] hover:text-[#E5E1E4]'
              }`}
            >
              <Mic size={13} />
              <span>Dictate</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('notes')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs transition-all ${
                activeTab === 'notes'
                  ? 'bg-[#2A2A2C] text-[#5B8CFF] font-medium shadow-sm border border-[#434653]/30'
                  : 'text-[#C3C6D6] hover:text-[#E5E1E4]'
              }`}
            >
              <FileText size={13} />
              <span>Notes</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('snippets')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs transition-all ${
                activeTab === 'snippets'
                  ? 'bg-[#2A2A2C] text-[#5B8CFF] font-medium shadow-sm border border-[#434653]/30'
                  : 'text-[#C3C6D6] hover:text-[#E5E1E4]'
              }`}
            >
              <Code2 size={13} />
              <span>Snippets</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('live')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs transition-all ${
                activeTab === 'live'
                  ? 'bg-[#2A2A2C] text-[#5B8CFF] font-medium shadow-sm border border-[#434653]/30'
                  : 'text-[#C3C6D6] hover:text-[#E5E1E4]'
              }`}
            >
              <Radio size={13} />
              <span>Live</span>
            </button>
          </div>
        </div>

        {/* Primary Stage Viewport */}
        <div className="p-4 flex flex-col gap-3.5 bg-[#1B1B1D]">
          {/* STATE 1: IDLE VIEW */}
          {engineState === 'idle' && (
            <div className="flex flex-col gap-3">
              {/* Telemetry Card */}
              <div className="bg-[#201F21] rounded-xl p-3 flex flex-col gap-2 border border-[#2A2A2E]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-[#5B8CFF]" />
                    <span className="font-semibold text-xs text-[#E5E1E4]">
                      Whisper Turbo Local
                    </span>
                  </div>
                  <div className="px-2 py-0.5 rounded-md bg-[#2A2A2C] font-mono text-[11px] text-[#77DAA4] flex items-center gap-1 border border-[#434653]/20">
                    <Gauge size={11} />
                    12ms latency
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#C3C6D6] pt-0.5">
                  <span className="flex items-center gap-1.5">
                    <Volume2 size={12} className="text-[#8D909F]" />
                    Mic: HyperX QuadCast S
                  </span>
                  <span className="font-mono text-[10px] text-[#8D909F] bg-[#0E0E10] px-1.5 py-0.5 rounded">
                    FP16 CUDA
                  </span>
                </div>
              </div>

              {/* Target Application Context */}
              <div className="bg-[#2A2A2C] rounded-xl p-3 flex flex-col gap-2 border border-[#434653]/30">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-[#8D909F] font-medium">
                    Target Application Context
                  </span>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#201F21] text-[#5B8CFF] border border-[#5B8CFF]/20">
                    code.exe (VS Code)
                  </span>
                </div>
                <p className="text-xs text-[#C3C6D6] italic leading-relaxed">
                  "Press hotkey or button to stream formatted text directly into cursor location..."
                </p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <Circle size={6} className="fill-[#8D909F] text-[#8D909F]" />
                  <span className="text-[11px] text-[#8D909F]">Direct Injection Hook Active</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setEngineState('recording')}
                  className="w-full h-11 rounded-xl bg-[#5B8CFF] hover:bg-[#5B8CFF]/90 active:scale-[0.99] text-[#001847] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Mic size={16} />
                  <span>Start Dictation</span>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#001847]/15 text-[#001847]">
                    Win+Alt+Space
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSuccessToast(true)}
                    className="h-9 px-3 rounded-lg bg-[#201F21] hover:bg-[#2A2A2C] text-[#E5E1E4] text-xs transition-colors flex items-center justify-center gap-1.5 border border-[#2A2A2E]"
                  >
                    <ClipboardPaste size={14} className="text-[#8D909F]" />
                    <span>Paste Last</span>
                    <kbd className="font-mono text-[10px] text-[#8D909F] bg-[#131315] px-1 py-0.5 rounded">
                      ^V
                    </kbd>
                  </button>
                  <button
                    type="button"
                    disabled
                    className="h-9 px-3 rounded-lg bg-[#201F21]/40 text-[#434653] cursor-not-allowed text-xs flex items-center justify-center gap-1.5 border border-[#2A2A2E]/40"
                    title="Auto-Format requires active transcription"
                  >
                    <Sparkles size={14} />
                    <span>Auto-Format</span>
                    <span className="text-[10px] text-[#434653]">Off</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATE 2: RECORDING VIEW */}
          {engineState === 'recording' && (
            <div className="flex flex-col gap-3">
              {/* Live Audio HUD Card */}
              <div className="bg-[#201F21] rounded-xl p-3.5 flex flex-col gap-3 border border-[#5B8CFF]/40 shadow-[0_0_20px_rgba(91,140,255,0.15)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B8CFF] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5B8CFF]" />
                    </span>
                    <span className="font-semibold text-xs text-[#E5E1E4]">
                      Listening Active
                    </span>
                  </div>
                  <div className="px-2 py-0.5 rounded-md bg-[#2A2A2C] text-[#B2C5FF] font-mono text-[11px] flex items-center gap-1 border border-[#5B8CFF]/20">
                    <Volume2 size={12} />
                    <span>-18.4 dB</span>
                  </div>
                </div>

                {/* Dynamic Waveform Visualizer (12 oscillating bars) */}
                <div className="flex items-center justify-center gap-1.5 h-14 px-2 bg-[#0E0E10] rounded-lg border border-[#2A2A2E]">
                  {[12, 28, 44, 20, 52, 34, 58, 30, 42, 18, 36, 14].map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className={`w-1.5 rounded-full bg-[#5B8CFF] transition-all duration-150 animate-pulse`}
                    />
                  ))}
                </div>

                {/* Active Mic & Elapsed Timer */}
                <div className="flex items-center justify-between pt-0.5 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Mic size={13} className="text-[#5B8CFF]" />
                    <span className="text-[11px] text-[#C3C6D6] truncate">
                      Listening to HyperX QuadCast S...
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#5B8CFF] font-semibold tracking-wider">
                    00:04.8
                  </span>
                </div>
              </div>

              {/* Real-time Stream bubble */}
              <div className="bg-[#2A2A2C] rounded-xl p-3 flex flex-col gap-1 border border-[#434653]/30">
                <span className="text-[10px] uppercase tracking-wider text-[#8D909F] font-medium">
                  Real-time Stream
                </span>
                <p className="text-xs text-[#E5E1E4] leading-relaxed">
                  "The architecture uses a pipeline where audio frames are buffered and then{' '}
                  <span className="text-[#8D909F] animate-pulse">
                    injected into the target cursor position seamlessly..."
                  </span>
                </p>
              </div>

              {/* Stop & Inject CTA */}
              <button
                type="button"
                onClick={() => setEngineState('processing')}
                className="w-full h-11 rounded-xl bg-[#E8544E] hover:bg-[#E8544E]/90 active:scale-[0.99] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Square size={14} className="fill-current" />
                <span>Stop & Inject Text</span>
              </button>
            </div>
          )}

          {/* STATE 3: PROCESSING VIEW */}
          {engineState === 'processing' && (
            <div className="flex flex-col gap-3">
              <div className="bg-[#201F21] rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center border border-[#F2B84B]/30 shadow-lg">
                <div className="relative flex items-center justify-center w-14 h-14">
                  <div className="w-14 h-14 rounded-full bg-[#F2B84B]/15 animate-ping absolute" />
                  <div className="w-12 h-12 rounded-full bg-[#2A2A2C] flex items-center justify-center text-[#F2B84B] relative z-10 border border-[#F2B84B]/30">
                    <RefreshCw size={22} className="animate-spin" />
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-xs text-[#E5E1E4]">
                    Processing with Whisper v3-Small
                  </span>
                  <span className="text-[11px] text-[#C3C6D6]">
                    Converting audio payload into refined token vectors...
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#131315] rounded-lg p-2 flex flex-col gap-1.5 text-left border border-[#2A2A2E]">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#F2B84B]" />
                      <span className="font-medium text-[11px] text-[#E5E1E4]">
                        LLM Cleanup in-flight
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#F2B84B] font-medium">
                      Ollama • llama3.2:3b
                    </span>
                  </div>
                  <div className="w-full bg-[#2A2A2C] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#F2B84B] h-full rounded-full w-3/4 animate-pulse" />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEngineState('idle')}
                className="w-full h-9 rounded-lg bg-[#201F21] hover:bg-[#2A2A2C] text-[#E5E1E4] text-xs transition-colors flex items-center justify-center gap-1.5 border border-[#2A2A2E]"
              >
                <X size={14} />
                <span>Cancel Operation</span>
              </button>
            </div>
          )}
        </div>

        {/* Active Keycap Footprint & Win32 Hook Status */}
        <div className="px-4 py-2.5 bg-[#201F21] border-t border-[#2A2A2E] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Keyboard size={13} className="text-[#8D909F]" />
            <span className="text-[11px] text-[#8D909F]">Hotkey:</span>
            <div className="flex items-center gap-1">
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#2A2A2C] text-[#E5E1E4] border border-[#434653]/30">
                Win
              </kbd>
              <span className="text-[#8D909F] text-xs">+</span>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#2A2A2C] text-[#E5E1E4] border border-[#434653]/30">
                Alt
              </kbd>
              <span className="text-[#8D909F] text-xs">+</span>
              <kbd className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#2A2A2C] text-[#E5E1E4] border border-[#434653]/30">
                Space
              </kbd>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#77DAA4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#77DAA4]" />
            <span className="text-[11px] text-[#8D909F]">Win32 Hook Active</span>
          </div>
        </div>
      </div>

      {/* Non-Blocking Desktop Toast Notifications Section */}
      <div className="mt-3.5 flex flex-col gap-2 w-full max-w-[420px]">
        {/* Error Toast Notification */}
        {showErrorToast && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#93000A] text-[#FFDAD6] shadow-lg border border-[#FFB4AB]/30 transition-all">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-[#BA1A1A] flex items-center justify-center text-white shrink-0">
                <MicOff size={14} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs truncate">Microphone Blocked</span>
                <span className="text-[11px] opacity-90 truncate">
                  Input muted in Windows privacy settings
                </span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Dismiss error"
              onClick={() => setShowErrorToast(false)}
              className="w-6 h-6 rounded-md hover:bg-black/20 flex items-center justify-center shrink-0 ml-2 text-[#FFDAD6]"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Success Toast Notification */}
        {showSuccessToast && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#003821] text-[#93F7BF] shadow-lg border border-[#3EA271]/40 transition-all">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-[#3EA271] flex items-center justify-center text-[#002112] shrink-0">
                <CheckCircle2 size={14} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs truncate">Copied to Clipboard</span>
                <span className="text-[11px] opacity-90 truncate">18 words ready to paste</span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Dismiss success notification"
              onClick={() => setShowSuccessToast(false)}
              className="w-6 h-6 rounded-md hover:bg-black/20 flex items-center justify-center shrink-0 ml-2 text-[#93F7BF]"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
