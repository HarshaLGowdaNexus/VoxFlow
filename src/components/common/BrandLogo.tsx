import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  variant?: 'standard' | 'light-acrylic' | 'monochrome' | 'toast-glow' | 'tray';
  state?: 'idle' | 'recording' | 'processing' | 'muted';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 28,
  className = '',
  variant = 'standard',
  state = 'idle',
}) => {
  if (variant === 'monochrome') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className={`text-[#8D909F] ${className}`}
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="6" />
        <line x1="8" y1="10" x2="8" y2="14" strokeLinecap="round" />
        <line x1="10" y1="8" x2="10" y2="16" strokeLinecap="round" />
        <line x1="12" y1="6.5" x2="12" y2="17.5" strokeLinecap="round" />
        <line x1="14" y1="8" x2="14" y2="16" strokeLinecap="round" />
        <line x1="16" y1="10" x2="16" y2="14" strokeLinecap="round" />
        <circle cx="18" cy="6" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (variant === 'light-acrylic') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
      >
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#131315" />
        <circle cx="12" cy="12" r="6" fill="#201F21" />
        <rect x="8" y="10" width="1.5" height="4" rx="0.75" fill="#5B8CFF" />
        <rect x="10" y="8" width="1.5" height="8" rx="0.75" fill="#5B8CFF" />
        <rect x="12" y="6.5" width="1.5" height="11" rx="0.75" fill="#5B8CFF" />
        <rect x="14" y="8" width="1.5" height="8" rx="0.75" fill="#5B8CFF" />
        <rect x="16" y="10" width="1.5" height="4" rx="0.75" fill="#5B8CFF" />
        <circle cx="18" cy="6" r="1.5" fill="#5B8CFF" />
      </svg>
    );
  }

  // Tray mode variations
  if (state === 'recording') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`filter drop-shadow-[0_0_8px_rgba(91,140,255,0.6)] ${className}`}
      >
        <rect x="2" y="2" width="20" height="20" rx="5.5" fill="#002665" />
        <circle cx="12" cy="12" r="6.5" fill="#1857C8" />
        <rect x="8" y="9" width="1.5" height="6" rx="0.75" fill="#B2C5FF" className="animate-pulse" />
        <rect x="10" y="7" width="1.5" height="10" rx="0.75" fill="#DAE2FF" />
        <rect x="12" y="5" width="1.5" height="14" rx="0.75" fill="#FFFFFF" className="animate-pulse" />
        <rect x="14" y="7" width="1.5" height="10" rx="0.75" fill="#DAE2FF" />
        <rect x="16" y="9" width="1.5" height="6" rx="0.75" fill="#B2C5FF" className="animate-pulse" />
        <circle cx="18" cy="6" r="1.6" fill="#B2C5FF" className="animate-ping" />
      </svg>
    );
  }

  if (state === 'processing') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
      >
        <rect x="2" y="2" width="20" height="20" rx="5.5" fill="#1B1B1D" />
        <circle cx="12" cy="12" r="6" fill="#201F21" />
        <circle cx="12" cy="12" r="7.5" stroke="#353437" strokeWidth="1.8" fill="none" />
        <path d="M12 4.5 A7.5 7.5 0 0 1 19.5 12" stroke="#F2B84B" strokeWidth="1.8" strokeLinecap="round" fill="none" className="animate-spin origin-center" />
        <circle cx="18" cy="6" r="1.5" fill="#F2B84B" />
      </svg>
    );
  }

  if (state === 'muted') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
      >
        <rect x="2" y="2" width="20" height="20" rx="5.5" fill="#1B1B1D" />
        <circle cx="12" cy="12" r="6" fill="#201F21" />
        <rect x="10" y="8" width="1.5" height="8" rx="0.75" fill="#8D909F" />
        <rect x="12" y="7" width="1.5" height="10" rx="0.75" fill="#8D909F" />
        <rect x="14" y="8" width="1.5" height="8" rx="0.75" fill="#8D909F" />
        <line x1="6" y1="6" x2="18" y2="18" stroke="#FFB4AB" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18" cy="6" r="1.5" fill="#FFB4AB" />
      </svg>
    );
  }

  // Standard master mark (256x256 scaled down to size)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="256" height="256" rx="56" fill="#131315" />
      <circle cx="128" cy="128" r="64" fill="#201F21" />
      <rect x="88" y="108" width="16" height="40" rx="8" fill="#5B8CFF" />
      <rect x="112" y="88" width="16" height="80" rx="8" fill="#5B8CFF" />
      <rect x="136" y="68" width="16" height="120" rx="8" fill="#5B8CFF" />
      <rect x="160" y="88" width="16" height="80" rx="8" fill="#5B8CFF" />
      <rect x="184" y="108" width="16" height="40" rx="8" fill="#5B8CFF" />
      {/* Top right satellite indicator */}
      <circle cx="196" cy="60" r="14" fill="#5B8CFF" />
    </svg>
  );
};
