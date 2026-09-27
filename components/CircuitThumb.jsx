// Navy "circuit board" artwork echoing the logo, varied per item by a seed string.
function hash(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function CircuitThumb({ seed, className = 'h-36', children }) {
  const h = hash(seed);
  const traces = Array.from({ length: 6 }, (_, i) => {
    const y = 14 + ((h >> (i * 3)) % 72);
    const x1 = 4 + ((h >> (i * 2 + 1)) % 40);
    const x2 = x1 + 20 + ((h >> (i + 5)) % 35);
    const bend = (h >> (i + 2)) % 2 ? 10 : -10;
    return { y, x1, x2, bend };
  });
  const angle = 120 + (h % 60);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-white/5 ${className}`}
      style={{ background: `linear-gradient(${angle}deg, #0a1128 0%, #1a2656 55%, #3d4b8a 100%)` }}
    >
      <div className="absolute inset-0 bg-grid-pattern [background-size:24px_24px] opacity-20" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {traces.map((t, i) => (
          <g key={i} stroke="rgba(157,172,223,0.55)" strokeWidth="0.6" fill="none">
            <path d={`M${t.x1} ${t.y} H${t.x2} l6 ${t.bend} H${Math.min(t.x2 + 30, 98)}`} vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </svg>
      {traces.map((t, i) => (
        <span
          key={i}
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-200/70 bg-bg"
          style={{ left: `${t.x1}%`, top: `${t.y}%` }}
        />
      ))}
      <div className="absolute inset-0 noise opacity-[0.05]" />
      {children}
    </div>
  );
}
