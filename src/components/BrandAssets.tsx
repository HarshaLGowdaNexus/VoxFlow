import React, { useState } from 'react';
import {
  Code,
  Download,
  Check,
  CheckCircle2,
  Share2,
  Palette,
  Grid3X3,
  LayoutDashboard,
  BellRing,
  Package,
  FileCode,
  Image as ImageIcon,
  Wifi,
  Volume2,
  Layers,
} from 'lucide-react';
import { WindowsTitleBar } from './common/WindowsTitleBar';
import { BrandLogo } from './common/BrandLogo';

interface BrandAssetsProps {
  onNavigate?: (screen: 'tray' | 'settings' | 'transcripts') => void;
}

export const BrandAssets: React.FC<BrandAssetsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scalability' | 'colors' | 'tray' | 'export'>('overview');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const copyHex = (hex: string) => {
    setCopiedToken(hex);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(hex);
    }
    showToast(`Hex code ${hex} copied!`);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const copySvgCode = () => {
    const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256"><rect width="256" height="256" rx="56" fill="#131315"/><circle cx="128" cy="128" r="64" fill="#201F21"/><rect x="88" y="108" width="16" height="40" rx="8" fill="#5B8CFF"/><rect x="112" y="88" width="16" height="80" rx="8" fill="#5B8CFF"/><rect x="136" y="68" width="16" height="120" rx="8" fill="#5B8CFF"/><rect x="160" y="88" width="16" height="80" rx="8" fill="#5B8CFF"/><rect x="184" y="108" width="16" height="40" rx="8" fill="#5B8CFF"/><circle cx="196" cy="60" r="14" fill="#5B8CFF"/></svg>`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(svgCode);
    }
    showToast('SVG Markup copied to clipboard!');
  };

  return (
    <div className="w-full min-h-screen bg-[#0E0E10] text-[#E5E1E4] flex flex-col selection:bg-[#5B8CFF]/30">
      {/* Windows Title Bar */}
      <WindowsTitleBar
        title="VoxFlow"
        subtitle="Brand & Logo System"
        badge="Brand Spec v1.4"
      />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Windows Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#1B1B1D]/95 backdrop-blur-xl border-b md:border-b-0 md:border-r border-[#2A2A2E] flex flex-col justify-between p-3 shrink-0">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-mono text-[#8D909F] uppercase tracking-wider font-semibold">
              Brand System
            </div>
            <nav className="space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors text-left ${
                  activeTab === 'overview'
                    ? 'bg-[#5B8CFF] text-[#001847] shadow-sm'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Overview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('scalability')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                  activeTab === 'scalability'
                    ? 'bg-[#5B8CFF] text-[#001847] font-semibold'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <Grid3X3 size={16} />
                <span>Icon Grid & Scalability</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('colors')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                  activeTab === 'colors'
                    ? 'bg-[#5B8CFF] text-[#001847] font-semibold'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <Palette size={16} />
                <span>Color & Theme Variants</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('tray')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                  activeTab === 'tray'
                    ? 'bg-[#5B8CFF] text-[#001847] font-semibold'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <BellRing size={16} />
                <span>System Tray & Badges</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('export')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                  activeTab === 'export'
                    ? 'bg-[#5B8CFF] text-[#001847] font-semibold'
                    : 'text-[#C3C6D6] hover:bg-[#201F21] hover:text-[#E5E1E4]'
                }`}
              >
                <Share2 size={16} />
                <span>Export Assets</span>
              </button>
            </nav>
          </div>

          {/* Engine Synced Footer Tag */}
          <div className="p-3 bg-[#201F21] rounded-xl border border-[#2A2A2E] flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#77DAA4] animate-pulse" />
              <span className="font-mono text-xs text-[#C3C6D6]">Engine Synced</span>
            </div>
            <span className="font-mono text-xs text-[#8D909F]">x64</span>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 bg-[#0E0E10] p-4 lg:p-6 overflow-y-auto flex flex-col gap-6">
          {/* Sub-header Toolbar: Native Desktop Shell Nuance */}
          <div className="flex flex-col gap-2.5 bg-[#1B1B1D] rounded-xl p-4 border border-[#2A2A2E] shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#8D909F]">
                <span>Brand System</span>
                <span>/</span>
                <span>Assets</span>
                <span>/</span>
                <span className="text-[#E5E1E4] font-semibold">App Icon & Brandmark</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#201F21] text-[#5B8CFF] font-mono text-[11px] border border-[#5B8CFF]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B8CFF] animate-pulse" />
                  Vector SVG • 1.5px Hairline Grid • HiDPI Ready
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#2A2A2E]">
              {/* Tabs Navigation */}
              <div className="flex items-center gap-1 bg-[#0E0E10] p-1 rounded-lg border border-[#2A2A2E] overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'overview'
                      ? 'bg-[#5B8CFF] text-[#001847] font-semibold shadow-sm'
                      : 'text-[#C3C6D6] hover:text-[#E5E1E4]'
                  }`}
                >
                  Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('scalability')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'scalability'
                      ? 'bg-[#5B8CFF] text-[#001847] font-semibold shadow-sm'
                      : 'text-[#C3C6D6] hover:text-[#E5E1E4]'
                  }`}
                >
                  Scalability (16-256px)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('colors')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'colors'
                      ? 'bg-[#5B8CFF] text-[#001847] font-semibold shadow-sm'
                      : 'text-[#C3C6D6] hover:text-[#E5E1E4]'
                  }`}
                >
                  Color Variants
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('tray')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'tray'
                      ? 'bg-[#5B8CFF] text-[#001847] font-semibold shadow-sm'
                      : 'text-[#C3C6D6] hover:text-[#E5E1E4]'
                  }`}
                >
                  Windows Tray & Badges
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('export')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'export'
                      ? 'bg-[#5B8CFF] text-[#001847] font-semibold shadow-sm'
                      : 'text-[#C3C6D6] hover:text-[#E5E1E4]'
                  }`}
                >
                  Export Suite
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copySvgCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2A2A2C] hover:bg-[#353437] text-[#E5E1E4] text-xs font-medium transition-colors border border-[#434653]/30"
                >
                  <Code size={14} className="text-[#8D909F]" />
                  <span>Copy SVG Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Packaging VoxFlow_BrandAssets_v1.4.zip...')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#5B8CFF] text-[#001847] font-semibold text-xs transition-all hover:brightness-105 active:brightness-95 shadow-sm"
                >
                  <Download size={14} />
                  <span>Download All (.SVG / .ICO)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Master-Detail Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Hero Card: Featured Logo Specification (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4 bg-[#1B1B1D] rounded-xl p-5 border border-[#2A2A2E] shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#8D909F] font-semibold">
                    Primary Mark Display
                  </span>
                  <h2 className="text-base font-bold text-[#E5E1E4] tracking-tight">
                    Precision Squircle Brandmark
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#201F21] text-[#77DAA4] font-mono text-[11px] border border-[#77DAA4]/20 font-medium">
                  Canonical Master v1.4
                </span>
              </div>

              {/* Acrylic Viewport with Dot Matrix Blueprint */}
              <div className="relative w-full h-80 sm:h-96 rounded-xl bg-[#0E0E10] overflow-hidden flex items-center justify-center border border-[#2A2A2E] shadow-inner">
                {/* Dot Matrix Blueprint Pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(#8D909F 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Geometric Axis Guides */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                  <div className="w-full h-px bg-[#8D909F]" />
                  <div className="h-full w-px bg-[#8D909F] absolute" />
                  <div className="w-64 h-64 rounded-full border border-dashed border-[#8D909F] absolute" />
                  <div className="w-72 h-72 rounded-[36px] border border-[#8D909F] absolute" />
                </div>

                {/* Master Image Asset (Vector Representation) */}
                <div className="relative z-10 p-6 flex flex-col items-center group cursor-pointer">
                  <div className="transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)]">
                    <BrandLogo size={192} />
                  </div>
                  <span className="mt-3 font-mono text-[11px] text-[#8D909F] group-hover:text-[#5B8CFF] transition-colors">
                    256 × 256 px Display Unit
                  </span>
                </div>

                {/* Dimension Callout Tags */}
                <div className="absolute top-4 left-4 px-2 py-0.5 rounded bg-[#201F21]/90 backdrop-blur-md text-[#8D909F] font-mono text-[11px] border border-[#2A2A2E]">
                  R: 28px Squircle
                </div>
                <div className="absolute bottom-4 right-4 px-2 py-0.5 rounded bg-[#201F21]/90 backdrop-blur-md text-[#5B8CFF] font-mono text-[11px] border border-[#5B8CFF]/30">
                  5-Bar Waveform Inset
                </div>
              </div>

              {/* Live Geometry & Structural Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-[#201F21] flex flex-col gap-1 border border-[#2A2A2E]">
                  <span className="font-mono text-[10px] text-[#8D909F] uppercase tracking-wider">
                    Waveform Engine Rhythm
                  </span>
                  <p className="text-xs text-[#E5E1E4] leading-relaxed">
                    5 vertical acoustic frequency bars with 8px corner radii, balanced along the
                    horizontal audio axis in primary #5B8CFF.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#201F21] flex flex-col gap-1 border border-[#2A2A2E]">
                  <span className="font-mono text-[10px] text-[#8D909F] uppercase tracking-wider">
                    Satellite Indicator
                  </span>
                  <p className="text-xs text-[#E5E1E4] leading-relaxed">
                    Autonomous top-right nodal indicator (14px) designating active background
                    dictation engine and accessibility HUD status.
                  </p>
                </div>
              </div>

              {/* Asset Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
                <div className="px-2.5 py-1 rounded bg-[#2A2A2C] text-[#C3C6D6] border border-[#434653]/30">
                  Format: <span className="text-[#E5E1E4] font-semibold">SVG Vector</span>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#2A2A2C] text-[#C3C6D6] border border-[#434653]/30">
                  Color Space: <span className="text-[#E5E1E4] font-semibold">sRGB / Display P3</span>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#2A2A2C] text-[#C3C6D6] border border-[#434653]/30">
                  Aspect Ratio: <span className="text-[#E5E1E4] font-semibold">1:1 Square</span>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#2A2A2C] text-[#C3C6D6] border border-[#434653]/30">
                  Target: <span className="text-[#E5E1E4] font-semibold">Win32 / UWP / Fluent Shell</span>
                </div>
              </div>
            </div>

            {/* Right Column: Scalability, Variants, Token Swatches (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Scalability Matrix Card */}
              <div className="flex flex-col gap-3.5 bg-[#1B1B1D] rounded-xl p-5 border border-[#2A2A2E] shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Grid3X3 size={16} className="text-[#5B8CFF]" />
                    <h3 className="font-semibold text-xs text-[#E5E1E4]">
                      Multi-Scale Matrix Preview
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#8D909F]">Native Bitmaps</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 items-end bg-[#0E0E10] p-3 rounded-lg border border-[#2A2A2E]">
                  {/* 16px */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 flex items-center justify-center bg-[#201F21] rounded border border-[#2A2A2E]">
                      <BrandLogo size={14} />
                    </div>
                    <span className="font-mono text-[10px] text-[#8D909F]">16px</span>
                    <span className="text-[9px] text-[#434653]">Tray</span>
                  </div>

                  {/* 24px */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 flex items-center justify-center bg-[#201F21] rounded border border-[#2A2A2E]">
                      <BrandLogo size={18} />
                    </div>
                    <span className="font-mono text-[10px] text-[#8D909F]">24px</span>
                    <span className="text-[9px] text-[#434653]">Menu</span>
                  </div>

                  {/* 32px */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-11 h-11 flex items-center justify-center bg-[#201F21] rounded border border-[#2A2A2E]">
                      <BrandLogo size={24} />
                    </div>
                    <span className="font-mono text-[10px] text-[#8D909F]">32px</span>
                    <span className="text-[9px] text-[#434653]">Titlebar</span>
                  </div>

                  {/* 48px */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 flex items-center justify-center bg-[#201F21] rounded border border-[#2A2A2E]">
                      <BrandLogo size={34} />
                    </div>
                    <span className="font-mono text-[10px] text-[#8D909F]">48px</span>
                    <span className="text-[9px] text-[#434653]">Desktop</span>
                  </div>

                  {/* 64px */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-16 h-16 flex items-center justify-center bg-[#201F21] rounded border border-[#2A2A2E]">
                      <BrandLogo size={46} />
                    </div>
                    <span className="font-mono text-[10px] text-[#8D909F]">64px</span>
                    <span className="text-[9px] text-[#434653]">Start Tile</span>
                  </div>

                  {/* 128px */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-20 h-20 flex items-center justify-center bg-[#201F21] rounded border border-[#2A2A2E]">
                      <BrandLogo size={62} />
                    </div>
                    <span className="font-mono text-[10px] text-[#8D909F]">128px</span>
                    <span className="text-[9px] text-[#434653]">MS Store</span>
                  </div>
                </div>
              </div>

              {/* Contextual Environments Card */}
              <div className="flex flex-col gap-3.5 bg-[#1B1B1D] rounded-xl p-5 border border-[#2A2A2E] shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-[#F7BD4F]" />
                    <h3 className="font-semibold text-xs text-[#E5E1E4]">
                      Contextual Surface Modes
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#8D909F]">
                    WCAG AAA / High Contrast
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* Standard Mica Dark */}
                  <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-[#201F21] text-center border border-[#2A2A2E]">
                    <div className="w-12 h-12 rounded-lg bg-[#2A2A2C] flex items-center justify-center">
                      <BrandLogo size={32} />
                    </div>
                    <span className="font-semibold text-xs text-[#E5E1E4]">Standard</span>
                    <span className="text-[10px] text-[#8D909F]">Mica Dark</span>
                  </div>

                  {/* Light Acrylic Contrast */}
                  <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-[#201F21] text-center border border-[#2A2A2E]">
                    <div className="w-12 h-12 rounded-lg bg-[#E5E1E4] flex items-center justify-center shadow">
                      <BrandLogo size={32} variant="light-acrylic" />
                    </div>
                    <span className="font-semibold text-xs text-[#E5E1E4]">Light Acrylic</span>
                    <span className="text-[10px] text-[#8D909F]">Inverted Inset</span>
                  </div>

                  {/* Monochrome Wireframe */}
                  <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-[#201F21] text-center border border-[#2A2A2E]">
                    <div className="w-12 h-12 rounded-lg bg-[#0E0E10] flex items-center justify-center border border-[#2A2A2E]">
                      <BrandLogo size={32} variant="monochrome" />
                    </div>
                    <span className="font-semibold text-xs text-[#E5E1E4]">Monochrome</span>
                    <span className="text-[10px] text-[#8D909F]">1-Bit Print</span>
                  </div>

                  {/* Toast Notification Alert Active Glow */}
                  <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-[#201F21] text-center border border-[#2A2A2E]">
                    <div className="relative w-12 h-12 rounded-lg bg-[#2A2A2C] flex items-center justify-center overflow-hidden">
                      <span className="absolute inset-0 rounded-lg bg-[#5B8CFF]/20 animate-ping" />
                      <BrandLogo size={32} className="relative z-10" />
                    </div>
                    <span className="font-semibold text-xs text-[#E5E1E4]">Toast Alert</span>
                    <span className="text-[10px] text-[#5B8CFF] font-mono">Active Glow</span>
                  </div>
                </div>
              </div>

              {/* Color Tokens Reference Card */}
              <div className="flex flex-col gap-3 bg-[#1B1B1D] rounded-xl p-5 border border-[#2A2A2E] shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette size={16} className="text-[#77DAA4]" />
                    <h3 className="font-semibold text-xs text-[#E5E1E4]">Design Token Palette</h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#8D909F]">Click hex to copy</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Token: Acoustic Blue */}
                  <button
                    type="button"
                    onClick={() => copyHex('#5B8CFF')}
                    className="flex items-center justify-between p-2 rounded bg-[#201F21] hover:bg-[#2A2A2C] transition-colors group text-left border border-[#2A2A2E]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-[#5B8CFF] shadow-sm" />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#E5E1E4]">Acoustic Blue</span>
                        <span className="text-[10px] text-[#8D909F]">Accent / Wave</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[#5B8CFF] group-hover:underline">
                      {copiedToken === '#5B8CFF' ? 'Copied!' : '#5B8CFF'}
                    </span>
                  </button>

                  {/* Token: Slate Surface */}
                  <button
                    type="button"
                    onClick={() => copyHex('#1A1A1D')}
                    className="flex items-center justify-between p-2 rounded bg-[#201F21] hover:bg-[#2A2A2C] transition-colors group text-left border border-[#2A2A2E]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-[#1A1A1D] border border-[#2A2A2E] shadow-sm" />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#E5E1E4]">Slate Surface</span>
                        <span className="text-[10px] text-[#8D909F]">Elevated Layer 1</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[#8D909F] group-hover:text-white">
                      {copiedToken === '#1A1A1D' ? 'Copied!' : '#1A1A1D'}
                    </span>
                  </button>

                  {/* Token: Border Hairline */}
                  <button
                    type="button"
                    onClick={() => copyHex('#2A2A2E')}
                    className="flex items-center justify-between p-2 rounded bg-[#201F21] hover:bg-[#2A2A2C] transition-colors group text-left border border-[#2A2A2E]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-[#2A2A2E] shadow-sm" />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#E5E1E4]">
                          Sub-grid Hairline
                        </span>
                        <span className="text-[10px] text-[#8D909F]">Boundary Stroke</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[#8D909F] group-hover:text-white">
                      {copiedToken === '#2A2A2E' ? 'Copied!' : '#2A2A2E'}
                    </span>
                  </button>

                  {/* Token: Transcribe Amber */}
                  <button
                    type="button"
                    onClick={() => copyHex('#F2B84B')}
                    className="flex items-center justify-between p-2 rounded bg-[#201F21] hover:bg-[#2A2A2C] transition-colors group text-left border border-[#2A2A2E]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-[#F2B84B] shadow-sm" />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#E5E1E4]">
                          Transcribe Amber
                        </span>
                        <span className="text-[10px] text-[#8D909F]">Processing State</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[#F7BD4F] group-hover:underline">
                      {copiedToken === '#F2B84B' ? 'Copied!' : '#F2B84B'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Windows 11 System Tray States Dock */}
          <div className="flex flex-col gap-4 bg-[#1B1B1D] rounded-xl p-5 border border-[#2A2A2E] shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#8D909F] font-semibold">
                  Dynamic Shell Integration
                </span>
                <h3 className="text-base font-bold text-[#E5E1E4]">
                  Windows 11 System Tray States
                </h3>
              </div>
              <span className="font-mono text-[11px] text-[#8D909F]">
                Taskbar Shell Inset: 16×16px Canvas
              </span>
            </div>

            {/* 4 Tray States */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tray State 1: Ready Idle */}
              <div className="flex flex-col p-3.5 rounded-xl bg-[#201F21] hover:bg-[#2A2A2C] transition-all border border-[#2A2A2E]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-semibold text-xs text-[#E5E1E4]">Tray Idle</span>
                  <span className="px-2 py-0.5 rounded bg-[#0E0E10] text-[#77DAA4] font-mono text-[10px] flex items-center gap-1 border border-[#77DAA4]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#77DAA4]" />
                    Ready
                  </span>
                </div>
                {/* Taskbar representation */}
                <div className="h-14 rounded-lg bg-[#0E0E10] flex items-center justify-center px-3 relative border border-[#2A2A2E]">
                  <div className="flex items-center gap-3">
                    <Wifi size={16} className="text-[#8D909F]" />
                    <Volume2 size={16} className="text-[#8D909F]" />
                    <div
                      onClick={() => onNavigate?.('tray')}
                      className="p-1 rounded bg-[#2A2A2C] hover:bg-[#353437] transition-colors cursor-pointer"
                      title="Open VoxFlow Tray"
                    >
                      <BrandLogo size={18} state="idle" />
                    </div>
                    <span className="font-mono text-[11px] text-[#C3C6D6]">10:42 AM</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#8D909F] mt-2.5 leading-normal">
                  Listening daemon parked; green satellite indicates Whisper v3 engine primed.
                </p>
              </div>

              {/* Tray State 2: Active Recording */}
              <div className="flex flex-col p-3.5 rounded-xl bg-[#201F21] hover:bg-[#2A2A2C] transition-all border border-[#2A2A2E]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-semibold text-xs text-[#E5E1E4]">Tray Dictating</span>
                  <span className="px-2 py-0.5 rounded bg-[#0E0E10] text-[#5B8CFF] font-mono text-[10px] flex items-center gap-1 border border-[#5B8CFF]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B8CFF] animate-ping" />
                    Live Input
                  </span>
                </div>
                <div className="h-14 rounded-lg bg-[#0E0E10] flex items-center justify-center px-3 relative border border-[#2A2A2E]">
                  <div className="flex items-center gap-3">
                    <Wifi size={16} className="text-[#8D909F]" />
                    <Volume2 size={16} className="text-[#8D909F]" />
                    <div
                      onClick={() => onNavigate?.('tray')}
                      className="p-1 rounded bg-[#5B8CFF]/20 shadow-[0_0_12px_rgba(91,140,255,0.4)] cursor-pointer"
                      title="Dictating"
                    >
                      <BrandLogo size={18} state="recording" />
                    </div>
                    <span className="font-mono text-[11px] text-[#C3C6D6]">10:42 AM</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#8D909F] mt-2.5 leading-normal">
                  Audio stream captured with low-latency zero-copy buffer; active glow elevation.
                </p>
              </div>

              {/* Tray State 3: Processing Amber */}
              <div className="flex flex-col p-3.5 rounded-xl bg-[#201F21] hover:bg-[#2A2A2C] transition-all border border-[#2A2A2E]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-semibold text-xs text-[#E5E1E4]">Tray Processing</span>
                  <span className="px-2 py-0.5 rounded bg-[#0E0E10] text-[#F7BD4F] font-mono text-[10px] flex items-center gap-1 border border-[#F7BD4F]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7BD4F]" />
                    Inferring
                  </span>
                </div>
                <div className="h-14 rounded-lg bg-[#0E0E10] flex items-center justify-center px-3 relative border border-[#2A2A2E]">
                  <div className="flex items-center gap-3">
                    <Wifi size={16} className="text-[#8D909F]" />
                    <Volume2 size={16} className="text-[#8D909F]" />
                    <div className="p-1 rounded bg-[#2A2A2C] cursor-pointer">
                      <BrandLogo size={18} state="processing" />
                    </div>
                    <span className="font-mono text-[11px] text-[#C3C6D6]">10:42 AM</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#8D909F] mt-2.5 leading-normal">
                  Neural model tokenization and grammatical punctuation synthesis ongoing.
                </p>
              </div>

              {/* Tray State 4: Muted / Hardware Blocked */}
              <div className="flex flex-col p-3.5 rounded-xl bg-[#201F21] hover:bg-[#2A2A2C] transition-all border border-[#2A2A2E]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-semibold text-xs text-[#E5E1E4]">Tray Muted</span>
                  <span className="px-2 py-0.5 rounded bg-[#0E0E10] text-[#E8544E] font-mono text-[10px] flex items-center gap-1 border border-[#E8544E]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8544E]" />
                    Blocked
                  </span>
                </div>
                <div className="h-14 rounded-lg bg-[#0E0E10] flex items-center justify-center px-3 relative border border-[#2A2A2E]">
                  <div className="flex items-center gap-3">
                    <Wifi size={16} className="text-[#8D909F]" />
                    <Volume2 size={16} className="text-[#8D909F]" />
                    <div className="p-1 rounded bg-[#2A2A2C] cursor-pointer">
                      <BrandLogo size={18} state="muted" />
                    </div>
                    <span className="font-mono text-[11px] text-[#C3C6D6]">10:42 AM</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#8D909F] mt-2.5 leading-normal">
                  Microphone permission revoked or physical hardware mute switch engaged.
                </p>
              </div>
            </div>

            {/* Export Action Bar Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 mt-1 bg-[#0E0E10] p-4 rounded-xl border border-[#2A2A2E]">
              <div className="flex items-center gap-2.5">
                <Package size={20} className="text-[#5B8CFF]" />
                <div className="flex flex-col">
                  <span className="font-semibold text-xs text-[#E5E1E4]">
                    Batch Package Generator
                  </span>
                  <span className="text-[10px] text-[#8D909F]">
                    Pre-compiled for Windows 11 SDK 22621 &amp; Visual Studio packaging
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast('Exporting VoxFlow.ico multi-res container...')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#201F21] hover:bg-[#2A2A2C] text-[#E5E1E4] text-xs transition-colors border border-[#2A2A2E]"
                >
                  <FileCode size={14} className="text-[#8D909F]" />
                  <span>Export .ICO (16-256 Multi-Res)</span>
                </button>
                <button
                  type="button"
                  onClick={copySvgCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#201F21] hover:bg-[#2A2A2C] text-[#E5E1E4] text-xs transition-colors border border-[#2A2A2E]"
                >
                  <Code size={14} className="text-[#8D909F]" />
                  <span>Export Vector .SVG</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Rendering @2x HiDPI raster assets...')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#5B8CFF] text-[#001847] font-semibold text-xs transition-all hover:brightness-105 active:brightness-95 shadow-sm"
                >
                  <ImageIcon size={14} />
                  <span>Export @2x HiDPI PNGs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Toast Feedback */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#201F21] text-[#E5E1E4] shadow-2xl border border-[#5B8CFF]/50 animate-in fade-in slide-in-from-bottom-3 duration-200">
              <CheckCircle2 size={16} className="text-[#77DAA4]" />
              <span className="font-semibold text-xs">{toastMessage}</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
