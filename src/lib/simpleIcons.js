import {
  siCplusplus,
  siDotnet,
  siJavascript,
  siOpenjdk,
  siPython,
  siTypescript,
} from "simple-icons";

import { normalizeLanguageName } from "@/lib/tech";

const ICONS_BY_LANGUAGE = {
  "JavaScript": siJavascript,
  "TypeScript": siTypescript,
  Python: siPython,
  Java: siOpenjdk,
  "C++": siCplusplus,
  "C#": siDotnet,
};

export function getLanguageSimpleIcon(languageName) {
  const normalized = normalizeLanguageName(languageName);
  if (!normalized) return null;

  const icon = ICONS_BY_LANGUAGE[normalized];
  if (!icon) return null;

  return {
    title: icon.title,
    hex: `#${icon.hex}`,
    path: icon.path,
    slug: icon.slug,
  };
}
