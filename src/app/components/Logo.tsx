interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <path
        d="M50 15L25 27.5V52.5C25 67.5 37.5 77.5 50 90C62.5 77.5 75 67.5 75 52.5V27.5L50 15Z"
        stroke="#1e3a5f"
        strokeWidth="4"
        fill="none"
      />
      <path d="M50 37.5V62.5M37.5 50H62.5" stroke="#1e3a5f" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="50" r="8" fill="#1e3a5f" />
    </svg>
  );
}
