"use client";

import { useEffect } from "react";

export default function ScrollToTopOnSlugChange({ slug }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    // Ensure we reset scroll even when navigating between dynamic routes
    // that share the same layout.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    // iOS Safari can sometimes keep scroll position on <body> vs <html>.
    // Keep a hard reset for reduced-motion (and as a safe fallback).
    if (prefersReducedMotion) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [slug]);

  return null;
}
