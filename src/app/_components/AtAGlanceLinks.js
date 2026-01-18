"use client";

import { useEffect, useId, useState } from "react";
import LivePreviewModal from "@/app/_components/LivePreviewModal";

const getEmbeddablePreviewUrl = (href) => {
  if (!href) return null;

  try {
    const url = new URL(href);
    const host = url.hostname;

    if (host.endsWith("drive.google.com")) {
      if (url.pathname.includes("/file/d/") && url.pathname.includes("/view")) {
        return href.replace("/view", "/preview");
      }

      const id = url.searchParams.get("id");
      if (id) {
        return `https://drive.google.com/file/d/${id}/preview`;
      }

      return null;
    }

    if (host.endsWith("docs.google.com")) {
      if (url.pathname.endsWith("/preview")) return href;
      if (url.pathname.endsWith("/edit")) return href.replace(/\/edit$/, "/preview");
      if (url.pathname.endsWith("/view")) return href.replace(/\/view$/, "/preview");
      return href;
    }

    return null;
  } catch {
    return null;
  }
};

export default function AtAGlanceLinks({
  observeId,
  links,
  projectTitle,
  headingLabel,
  openInNewTabLabel,
  closeLabel,
}) {
  const [show, setShow] = useState(false);
  const headingId = useId();

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

  if (!links || links.length === 0) return null;
  if (!show) return null;

  return (
    <div aria-labelledby={headingId}>
      <div id={headingId} className="text-xs uppercase tracking-wide text-slate-500">
        {headingLabel}
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {links.map((link) => {
          const previewUrl = getEmbeddablePreviewUrl(link.href);
          if (previewUrl) {
            return (
              <LivePreviewModal
                key={`aside-preview-${link.label}`}
                url={previewUrl}
                title={`${projectTitle} — ${link.label}`}
                openLabel={link.label}
                openInNewTabLabel={openInNewTabLabel}
                closeLabel={closeLabel}
                buttonClassName="inline-flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 hover:bg-white"
              />
            );
          }

          return (
            <a
              key={`aside-${link.label}`}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 hover:bg-white"
            >
              <span>{link.label}</span>
              <span aria-hidden className="text-slate-500">
                ↗
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
