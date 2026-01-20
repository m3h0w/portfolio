export default function GlobeIcon({ size = 16, className = "" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      width={size}
      height={size}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2c2.8 2.7 4.5 6.2 4.5 10S14.8 19.3 12 22c-2.8-2.7-4.5-6.2-4.5-10S9.2 4.7 12 2Z"
      />
    </svg>
  );
}
