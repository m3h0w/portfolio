const LANGUAGE_ALIASES = {
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  "c++": "C++",
  cpp: "C++",
  csharp: "C#",
  "c#": "C#",
};

export const KNOWN_LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
];

export function normalizeLanguageName(name) {
  if (!name) return null;
  const trimmed = String(name).trim();
  if (!trimmed) return null;

  const key = trimmed.toLowerCase();
  if (LANGUAGE_ALIASES[key]) return LANGUAGE_ALIASES[key];

  // Preserve canonical names if already correct.
  const canonical = KNOWN_LANGUAGES.find(
    (l) => l.toLowerCase() === trimmed.toLowerCase()
  );
  return canonical || trimmed;
}

export function isProgrammingLanguage(name) {
  const normalized = normalizeLanguageName(name);
  return Boolean(normalized && KNOWN_LANGUAGES.includes(normalized));
}

export function splitTechIntoLanguagesAndOther(techList) {
  const input = Array.isArray(techList) ? techList : [];
  const languages = [];
  const other = [];

  for (const item of input) {
    const normalized = normalizeLanguageName(item);
    if (normalized && KNOWN_LANGUAGES.includes(normalized)) {
      if (!languages.includes(normalized)) languages.push(normalized);
    } else if (item) {
      other.push(item);
    }
  }

  return { languages, other };
}

export function parseStackString(stack) {
  if (!stack) return [];
  return String(stack)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function inferMainLanguage({ mainLanguage, stack }) {
  const explicit = normalizeLanguageName(mainLanguage);
  if (explicit && KNOWN_LANGUAGES.includes(explicit)) return explicit;

  const items = parseStackString(stack);
  for (const t of items) {
    const normalized = normalizeLanguageName(t);
    if (normalized && KNOWN_LANGUAGES.includes(normalized)) return normalized;
  }

  return null;
}

export function formatExperienceShort(experience) {
  if (!experience) return "";
  if (typeof experience.years === "number" && experience.years > 0) {
    return `${experience.years}y`;
  }
  if (typeof experience.months === "number" && experience.months > 0) {
    return `${experience.months}mo`;
  }
  return "";
}

export function countryCodeToFlagEmoji(code) {
  const cc = String(code || "").trim().toUpperCase();
  if (cc.length !== 2) return "";
  const A = 0x1f1e6;
  const first = cc.codePointAt(0) - 65;
  const second = cc.codePointAt(1) - 65;
  if (first < 0 || first > 25 || second < 0 || second > 25) return "";
  return String.fromCodePoint(A + first, A + second);
}
