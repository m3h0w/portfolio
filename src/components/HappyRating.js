function Face({ filled }) {
  const fill = filled ? "#f59e0b" : "none"; // amber-500
  const stroke = filled ? "#f59e0b" : "#cbd5e1"; // slate-300
  const feature = filled ? "#ffffff" : "#cbd5e1";

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="18"
      height="18"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      <circle cx="9" cy="10" r="1.2" fill={feature} />
      <circle cx="15" cy="10" r="1.2" fill={feature} />
      <path
        d="M8.2 14.2c1 1.8 2.6 2.8 3.8 2.8s2.8-1 3.8-2.8"
        fill="none"
        stroke={feature}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HappyRating({ value = 0, max = 5, className = "" }) {
  const safeValue = Math.max(0, Math.min(max, Number(value) || 0));

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < safeValue;
        return <Face key={i} filled={filled} />;
      })}
    </span>
  );
}
