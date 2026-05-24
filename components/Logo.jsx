export default function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bcg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="60%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#bcg)" opacity="0.15" />
      <rect x="2" y="2" width="36" height="36" rx="10" fill="none" stroke="url(#bcg)" strokeWidth="1.5" />
      <path
        d="M13 13h7.5a4.5 4.5 0 0 1 0 9H13zm0 9h8a4.5 4.5 0 0 1 0 9H13z"
        fill="url(#bcg)"
      />
    </svg>
  );
}
