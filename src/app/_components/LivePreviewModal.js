"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const overlayVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
  exit: {
    opacity: 1,
    transition: { duration: 0.55 },
  },
};

const backdropVariants = {
  hidden: {
    opacity: 0,
    backgroundColor: "rgba(15, 23, 42, 0)",
    backdropFilter: "blur(0px)",
    WebkitBackdropFilter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    backgroundColor: "rgba(15, 23, 42, 0.38)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    backgroundColor: "rgba(15, 23, 42, 0)",
    backdropFilter: "blur(0px)",
    WebkitBackdropFilter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 22 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 520, damping: 20, mass: 0.75 },
  },
  exit: {
    opacity: 1,
    scale: 0.01,
    y: 22,
    transition: { duration: 0.16, ease: [0.4, 0, 1, 1] },
  },
};

export default function LivePreviewModal({
  url,
  title,
  openLabel,
  openAriaLabel,
  trigger,
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

  const portalRoot = typeof document !== "undefined" ? document.body : null;

  return (
    <>
      <button
        type="button"
        aria-label={
          openAriaLabel || (typeof openLabel === "string" ? openLabel : undefined)
        }
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
        className={
          buttonClassName ||
          "inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur hover:bg-white"
        }
      >
        {trigger ?? (
          <>
            {openLabel}
            <span aria-hidden>▣</span>
          </>
        )}
      </button>

      {portalRoot &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[999]"
                role="dialog"
                aria-modal="true"
                aria-labelledby={dialogTitleId}
                onClick={(event) => event.stopPropagation()}
                onPointerDown={(event) => event.stopPropagation()}
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.button
                  type="button"
                  className="absolute inset-0 will-change-[opacity,backdrop-filter]"
                  aria-label={closeLabel}
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpen(false);
                  }}
                  variants={backdropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />

                <motion.div
                  className="absolute left-1/2 top-1/2 w-[min(1100px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl will-change-[transform,opacity]"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
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
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-3 py-1.5 text-xs font-medium text-white hover:bg-(--accent-dark)"
                      >
                        {openInNewTabLabel}
                        <span aria-hidden>↗</span>
                      </a>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpen(false);
                        }}
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
          </AnimatePresence>,
          portalRoot
        )}
    </>
  );
}
