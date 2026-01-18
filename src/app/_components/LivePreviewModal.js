"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LivePreviewModal({
  url,
  title,
  openLabel,
  openInNewTabLabel,
  closeLabel,
  buttonClassName,
}) {
  const [open, setOpen] = useState(false);
  const dialogTitleId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!url) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          buttonClassName ||
          "inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur hover:bg-white"
        }
      >
        {openLabel}
        <span aria-hidden>▣</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-slate-900/35 backdrop-blur-sm"
              aria-label={closeLabel}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            />

            <motion.div
              className="absolute left-1/2 top-1/2 w-[min(1100px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ type: "spring", stiffness: 520, damping: 42, mass: 0.7 }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 bg-white/80 px-4 py-3 backdrop-blur">
                <div className="min-w-0">
                  <div
                    id={dialogTitleId}
                    className="truncate text-sm font-semibold text-slate-900"
                  >
                    {title}
                  </div>
                  <div className="truncate text-xs text-slate-500">{url}</div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-3 py-1.5 text-xs font-medium text-white hover:bg-(--accent-dark)"
                  >
                    {openInNewTabLabel}
                    <span aria-hidden>↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {closeLabel}
                    <span aria-hidden>×</span>
                  </button>
                </div>
              </div>

              <div className="h-[78vh] bg-slate-50">
                <iframe
                  src={url}
                  title={title}
                  className="h-full w-full"
                  sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  allow="clipboard-read; clipboard-write; fullscreen"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
