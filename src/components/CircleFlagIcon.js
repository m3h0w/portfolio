import React, { useId } from "react";

function normalizeCode(code) {
  const c = String(code || "").trim().toLowerCase();
  if (c === "uk" || c === "gb") return "en";
  return c;
}

export default function CircleFlagIcon({ code, className = "h-5 w-5", withRing = true }) {
  const id = useId();
  const normalized = normalizeCode(code);
  const clipId = `${id}-flag-${normalized}`;

  // Poland
  if (normalized === "pl") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <defs>
          <clipPath id={clipId}>
            <circle cx="12" cy="12" r="10" />
          </clipPath>
        </defs>
        <circle cx="12" cy="12" r="10" fill="#ffffff" />
        <g clipPath={`url(#${clipId})`}>
          <rect x="2" y="12" width="20" height="10" fill="#dc2626" />
        </g>
        {withRing ? (
          <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(15,23,42,0.08)" />
        ) : null}
      </svg>
    );
  }

  // Denmark
  if (normalized === "dk") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <defs>
          <clipPath id={clipId}>
            <circle cx="12" cy="12" r="10" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect width="24" height="24" fill="#c8102e" />
          <rect x="9" y="0" width="3" height="24" fill="#ffffff" />
          <rect x="0" y="10.5" width="24" height="3" fill="#ffffff" />
        </g>
        {withRing ? (
          <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(15,23,42,0.08)" />
        ) : null}
      </svg>
    );
  }

  // United States (simplified)
  if (normalized === "us") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <defs>
          <clipPath id={clipId}>
            <circle cx="12" cy="12" r="10" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect width="24" height="24" fill="#ffffff" />
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x="0" y={i * 3.4} width="24" height="1.7" fill="#b91c1c" />
          ))}
          <rect x="0" y="0" width="12" height="10" fill="#1d4ed8" />
          {/* star field dots */}
          {Array.from({ length: 12 }).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            return (
              <circle
                key={i}
                cx={2 + col * 2.5}
                cy={2 + row * 2.6}
                r={0.45}
                fill="#ffffff"
              />
            );
          })}
        </g>
        {withRing ? (
          <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(15,23,42,0.08)" />
        ) : null}
      </svg>
    );
  }

  // "en" (UK): Union Jack in a circle.
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={clipId}>
          <circle cx="12" cy="12" r="10" />
        </clipPath>
      </defs>
      <circle cx="12" cy="12" r="10" fill="#012169" />
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="24" fill="#012169" />

        {/* white diagonals */}
        <polygon points="0,0 3,0 24,21 24,24 21,24 0,3" fill="#ffffff" />
        <polygon points="0,21 0,24 3,24 24,3 24,0 21,0" fill="#ffffff" />

        {/* red diagonals */}
        <polygon points="0,0 2,0 24,22 24,24 22,24 0,2" fill="#c8102e" />
        <polygon points="0,22 0,24 2,24 24,2 24,0 22,0" fill="#c8102e" />

        {/* white central cross */}
        <rect x="9" y="0" width="6" height="24" fill="#ffffff" />
        <rect x="0" y="9" width="24" height="6" fill="#ffffff" />

        {/* red central cross */}
        <rect x="10.5" y="0" width="3" height="24" fill="#c8102e" />
        <rect x="0" y="10.5" width="24" height="3" fill="#c8102e" />
      </g>
      {withRing ? (
        <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(15,23,42,0.08)" />
      ) : null}
    </svg>
  );
}
