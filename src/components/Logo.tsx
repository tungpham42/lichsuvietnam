export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={(16 + 3.5 * Math.cos(a)).toFixed(2)}
            y1={(16 + 3.5 * Math.sin(a)).toFixed(2)}
            x2={(16 + 8 * Math.cos(a)).toFixed(2)}
            y2={(16 + 8 * Math.sin(a)).toFixed(2)}
            stroke="currentColor"
            strokeWidth="2"
          />
        );
      })}
      <circle cx="16" cy="16" r="3.2" fill="var(--color-hoe)" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
