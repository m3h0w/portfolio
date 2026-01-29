import { getLanguageSimpleIcon } from "@/lib/simpleIcons";

export default function LanguageIcon({
  name,
  title,
  className = "",
  size = 18,
  style,
}) {
  const icon = getLanguageSimpleIcon(name);
  if (!icon) return null;

  const accessibleName = title || icon.title || name;

  return (
    <svg
      role="img"
      aria-label={accessibleName}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: "block", ...style }}
      focusable="false"
    >
      <title>{accessibleName}</title>
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
