"use client";

export default function PrintButton({ className = "", label = "Print / Save as PDF" }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className}
    >
      {label}
    </button>
  );
}
