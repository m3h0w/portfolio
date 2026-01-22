import { normalizeLanguageName } from "@/lib/tech";

const DEVICON_CLASS_BY_LANGUAGE = {
  JavaScript: "devicon-javascript-plain",
  TypeScript: "devicon-typescript-plain",
  Python: "devicon-python-plain",
  Java: "devicon-java-plain",
  "C++": "devicon-cplusplus-plain",
  "C#": "devicon-csharp-plain",
};

export default function LanguageIcon({ name, title, className = "", size = 18, style }) {
  const normalized = normalizeLanguageName(name);
  const deviconClass = normalized ? DEVICON_CLASS_BY_LANGUAGE[normalized] : null;
  if (!deviconClass) return null;

  return (
    <i
      aria-label={title || normalized}
      role="img"
      className={`${deviconClass} ${className}`}
      style={{ fontSize: size, lineHeight: 1, ...style }}
    />
  );
}
