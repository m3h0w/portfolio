import Image from "next/image";

export default function GlassesBadge({
  size = 40,
  iconSize,
  roundingPx,
  className = "",
  iconClassName = "",
}) {
  const resolvedIconSize = iconSize ?? Math.round(size * 0.75);
  const resolvedRounding = roundingPx ?? Math.round(size * 0.15);

  return (
    <span
      className={`grid place-items-center bg-white shadow-sm ring-1 ring-slate-200/70 ${className}`}
      style={{ width: size, height: size, borderRadius: resolvedRounding }}
    >
      <Image
        src="/icon.svg"
        width={resolvedIconSize}
        height={resolvedIconSize}
        sizes={`${resolvedIconSize}px`}
        alt=""
        aria-hidden="true"
        className={`block ${iconClassName}`}
      />
    </span>
  );
}
