import React, { useState } from 'react';
import { TrayPopup } from './components/TrayPopup';
import { Settings } from './components/Settings';
import { Transcripts } from './components/Transcripts';
import { BrandAssets } from './components/BrandAssets';
import { ScreenType } from './types';
import { Volume2, Sliders, Database, Palette } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('tray');

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#E5E1E4] flex flex-col">
      {/* Top Desktop Screen Switcher Dock */}
      <div className="bg-[#131315]/95 backdrop-blur-xl border-b border-[#2A2A2E] px-4 py-2 flex items-center justify-between z-50 sticky top-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-[#8D909F] uppercase tracking-wider font-semibold hidden sm:inline">
            Screen Switcher:
          </span>
          <div className="flex items-center gap-1 bg-[#1B1B1D] p-1 rounded-xl border border-[#2A2A2E]">
            <button
              type="button"
              onClick={() => setActiveScreen('tray')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeScreen === 'tray'
                  ? 'bg-[#5B8CFF] text-[#001847] font-semibold shadow-sm'
                  : 'text-[#C3C6D6] hover:text-white hover:bg-[#201F21]'
              }`}
            >
              <Volume2 size={13} />
              <span>Tray Popup</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen('settings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeScreen === 'settings'
                  ? 'bg-[#5B8CFF] text-[#001847] font-semibold shadow-sm'
                  : 'text-[#C3C6D6] hover:text-white hover:bg-[#201F21]'
              }`}
            >
              <Sliders size={13} />
              <span>Settings</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen('transcripts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeScreen === 'transcripts'
                  ? 'bg-[#5B8CFF] text-[#001847] font-semibold shadow-sm'
                  : 'text-[#C3C6D6] hover:text-white hover:bg-[#201F21]'
              }`}
            >
              <Database size={13} />
              <span>Transcripts</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen('brand')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeScreen === 'brand'
                  ? 'bg-[#5B8CFF] text-[#001847] font-semibold shadow-sm'
                  : 'text-[#C3C6D6] hover:text-white hover:bg-[#201F21]'
              }`}
            >
              <Palette size={13} />
              <span>Logo &amp; Brand Assets</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-[#77DAA4] bg-[#201F21] px-2.5 py-1 rounded-md border border-[#77DAA4]/20 hidden md:inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#77DAA4] animate-pulse" />
            Static Front-end Ready
          </span>
        </div>
      </div>

      {/* Screen Render Viewport */}
      <div className="flex-1 w-full flex flex-col">
        {activeScreen === 'tray' && (
          <TrayPopup onNavigate={(screen) => setActiveScreen(screen)} />
        )}
        {activeScreen === 'settings' && (
          <Settings onNavigate={(screen) => setActiveScreen(screen)} />
        )}
        {activeScreen === 'transcripts' && (
          <Transcripts onNavigate={(screen) => setActiveScreen(screen)} />
        )}
        {activeScreen === 'brand' && (
          <BrandAssets onNavigate={(screen) => setActiveScreen(screen)} />
        )}
      </div>
    </div>
  );
}
