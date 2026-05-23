interface LogoProps {
  size?: number;
  className?: string;
  variant?: 'default' | 'white' | 'colored';
}

export default function LogoPro({ size = 40, className = '', variant = 'default' }: LogoProps) {
  const primaryColor = variant === 'white' ? '#FFFFFF' : '#1e3a5f';
  const accentColor = variant === 'white' ? '#FFFFFF' : '#d4a574';

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className}>
      {/* Container/Warehouse Base */}
      <rect
        x="20"
        y="50"
        width="35"
        height="35"
        rx="4"
        stroke={primaryColor}
        strokeWidth="3"
        fill="none"
      />

      {/* Container/Warehouse Top */}
      <rect
        x="30"
        y="35"
        width="35"
        height="35"
        rx="4"
        stroke={primaryColor}
        strokeWidth="3"
        fill="none"
      />

      {/* Container/Warehouse Front */}
      <rect
        x="40"
        y="20"
        width="35"
        height="35"
        rx="4"
        stroke={primaryColor}
        strokeWidth="3.5"
        fill={variant === 'colored' ? primaryColor : 'none'}
      />

      {/* Arrow/Movement - Smart Logistics Symbol */}
      <path
        d="M80 45 L95 60 L80 75 M95 60 L70 60"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Smart/Tech Dots Pattern */}
      <circle cx="47" cy="30" r="2.5" fill={accentColor} />
      <circle cx="57" cy="30" r="2.5" fill={accentColor} />
      <circle cx="67" cy="30" r="2.5" fill={accentColor} />

      {/* Grid Lines - Organization */}
      <line x1="47" y1="40" x2="47" y2="48" stroke={primaryColor} strokeWidth="1.5" opacity="0.4" />
      <line x1="57" y1="40" x2="57" y2="48" stroke={primaryColor} strokeWidth="1.5" opacity="0.4" />
      <line x1="67" y1="40" x2="67" y2="48" stroke={primaryColor} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}
