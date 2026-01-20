"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LivePreviewModal from "@/app/_components/LivePreviewModal";
import {
  isIframeLivePreviewAllowed,
  isLivePreviewLink,
  isReportPreviewLink,
} from "@/app/_components/livePreviewUtils";

export function LinkIcon({ href, label, isPreview }) {
  const normalizedHref = (href || "").toLowerCase();
  const normalizedLabel = (label || "").toLowerCase();

  const isGitHub =
    normalizedHref.includes("github.com") || normalizedLabel.includes("github");
  const isVideo =
    normalizedHref.includes("youtube.com") ||
    normalizedHref.includes("youtu.be") ||
    normalizedHref.includes("vimeo.com") ||
    normalizedLabel.includes("video");
  const isDoc =
    normalizedHref.endsWith(".pdf") ||
    normalizedHref.includes("arxiv.org") ||
    normalizedLabel.includes("paper") ||
    normalizedLabel.includes("docs") ||
    normalizedLabel.includes("documentation");

  const className =
    "h-4 w-4 text-slate-500 transition-colors group-hover:text-(--accent-dark)";

  if (isPreview) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4v16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
      </svg>
    );
  }

  if (isGitHub) {
    return (
      <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 .6a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.6 2.8 3.3 2 .1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.1v3.1c0 .3.2.7.8.6A11.4 11.4 0 0 0 12 .6Z" />
      </svg>
    );
  }

  if (isVideo) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 10.5v3l3-1.5-3-1.5Z"
        />
      </svg>
    );
  }

  if (isDoc) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 3h7l3 3v15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4a2 2 0 0 0 2 2h4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 13h8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h6" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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

export default function AtAGlanceLinks({
  observeId,
  links,
  projectTitle,
  projectSlug,
  headingLabel,
  openInNewTabLabel,
  closeLabel,
}) {
  const [show, setShow] = useState(false);
  const headingId = useId();
  const visibleLinks = (links || []).filter((link) => !link?.preview);

  useEffect(() => {
    if (!observeId) return;

    const element = document.getElementById(observeId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [observeId]);

  if (!visibleLinks || visibleLinks.length === 0) return null;

  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.section
          key="at-a-glance-links"
          aria-labelledby={headingId}
          initial={{ height: 0, opacity: 0, y: -6 }}
          animate={{ height: "auto", opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div
            id={headingId}
            className="text-xs uppercase tracking-wide text-slate-500"
          >
            {headingLabel}
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {visibleLinks.map((link) => {
              const allowInlinePreview =
                isLivePreviewLink(link) &&
                isIframeLivePreviewAllowed({ slug: projectSlug, href: link.href });

              const allowReportPreview = isReportPreviewLink(link);

              if (allowInlinePreview || allowReportPreview) {
                return (
                  <LivePreviewModal
                    key={`aside-preview-${link.label}`}
                    url={link.href}
                    title={`${projectTitle} — ${link.label}`}
                    openLabel={link.label}
                    openInNewTabLabel={openInNewTabLabel}
                    closeLabel={closeLabel}
                    trigger={
                      <span className="flex w-full items-center justify-between gap-3">
                        <span className="flex min-w-0 items-center gap-3">
                          <LinkIcon
                            href={link.href}
                            label={link.label}
                            isPreview={allowInlinePreview || allowReportPreview}
                          />
                          <span className="truncate">{link.label}</span>
                        </span>
                        <span
                          aria-hidden
                          className="text-slate-500 transition-colors group-hover:text-(--accent-dark)"
                        >
                          ▣
                        </span>
                      </span>
                    }
                    buttonClassName="group inline-flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-black/20 hover:bg-white"
                  />
                );
              }

              return (
                <a
                  key={`aside-${link.label}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-black/20 hover:bg-white"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <LinkIcon href={link.href} label={link.label} />
                    <span className="truncate">{link.label}</span>
                  </span>
                  <span
                    aria-hidden
                    className="text-slate-500 transition-colors group-hover:text-(--accent-dark)"
                  >
                    ↗
                  </span>
                </a>
              );
            })}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
