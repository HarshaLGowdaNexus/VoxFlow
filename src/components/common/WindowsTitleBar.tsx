import React from 'react';
import { Minus, Square, X, User } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface WindowsTitleBarProps {
  title?: string;
  badge?: string;
  subtitle?: string;
  showWindowControls?: boolean;
  className?: string;
  compact?: boolean;
}

export const WindowsTitleBar: React.FC<WindowsTitleBarProps> = ({
  title = 'VoxFlow',
  badge,
  subtitle,
  showWindowControls = true,
  className = '',
  compact = false,
}) => {
  return (
    <header
      className={`h-10 z-50 bg-[#0E0E10]/95 backdrop-blur-xl flex items-center justify-between border-b border-[#2A2A2E] px-3 select-none text-[#E5E1E4] ${className}`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <BrandLogo size={compact ? 18 : 20} className="shrink-0" />
        <span className="font-semibold text-[13px] tracking-tight text-[#E5E1E4] truncate">
          {title}
        </span>
        {subtitle && (
          <>
            <span className="text-[#8D909F] text-xs">—</span>
            <span className="text-[#C3C6D6] text-xs truncate hidden sm:inline">
              {subtitle}
            </span>
          </>
        )}
        {badge && (
          <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#201F21] text-[#B2C5FF] border border-[#434653]/40 shrink-0">
            {badge}
          </span>
        )}
      </div>

      {showWindowControls && (
        <div className="flex items-center h-full -mr-3">
          <div className="w-7 h-7 rounded-full bg-[#5B8CFF] flex items-center justify-center mr-2 text-[#002C72] shadow-sm">
            <User size={15} strokeWidth={2.2} />
          </div>
          <div className="flex items-center h-10">
            <button
              type="button"
              aria-label="Minimize"
              className="w-10 h-10 flex items-center justify-center text-[#8D909F] hover:bg-[#201F21] hover:text-[#E5E1E4] transition-colors"
            >
              <Minus size={13} strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Maximize"
              className="w-10 h-10 flex items-center justify-center text-[#8D909F] hover:bg-[#201F21] hover:text-[#E5E1E4] transition-colors"
            >
              <Square size={11} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              aria-label="Close"
              className="w-11 h-10 flex items-center justify-center text-[#8D909F] hover:bg-[#93000A] hover:text-white transition-colors"
            >
              <X size={13} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
