"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const COOKIE_NAME = "preferredLanguage";

function normalizeLanguage(value) {
  return value === "pl" ? "pl" : "en";
}

function setCookie(name, value) {
  const maxAge = 60 * 60 * 24 * 365; // 1 year
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
});

export function LanguageProvider({ initialLanguage = "en", children }) {
  const router = useRouter();
  const [language, setLanguageState] = useState(normalizeLanguage(initialLanguage));

  const setLanguage = useCallback(
    (nextLanguage) => {
      const normalized = normalizeLanguage(nextLanguage);
      setLanguageState(normalized);
      setCookie(COOKIE_NAME, normalized);
      router.refresh();
    },
    [router]
  );

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
