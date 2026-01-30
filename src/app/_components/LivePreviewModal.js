"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import GlassesIcon from "@/components/GlassesIcon";
import { getEmbedPreviewUrl } from "@/app/_components/livePreviewUtils";

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
  showPreviewIcon = false,
  cursorVariant,
  defaultOpen = false,
  previewType,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [portalRoot, setPortalRoot] = useState(null);
  const [soilEmbedReady, setSoilEmbedReady] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const dialogTitleId = useId();

  const isSoilMoistureEmbed = previewType === "soilMoistureEmbed";

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

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

  useEffect(() => {
    if (!isSoilMoistureEmbed) return;

    if (typeof window === "undefined") return;
    if (customElements.get("soil-moisture-embed")) {
      setSoilEmbedReady(true);
      return;
    }

    const existing = document.querySelector(
      "script[data-soil-moisture-embed]",
    );
    if (existing) {
      existing.addEventListener("load", () => setSoilEmbedReady(true), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://soil-moisture-embed.vercel.app/assets/embed-element.js";
    script.dataset.soilMoistureEmbed = "true";
    script.addEventListener("load", () => setSoilEmbedReady(true), {
      once: true,
    });
    document.head.appendChild(script);
  }, [isSoilMoistureEmbed]);

  if (!url) return null;

  const iframeUrl = getEmbedPreviewUrl(url);

  useEffect(() => {
    if (!open) return;
    if (isSoilMoistureEmbed) return;

    setIframeLoaded(false);
    setIframeError(false);
  }, [open, iframeUrl, isSoilMoistureEmbed]);

  const cursorStyle =
    cursorVariant === "white"
      ? { cursor: "url('/cursor-glasses-white.png') 16 16, pointer" }
      : cursorVariant === "black"
        ? { cursor: "url('/cursor-glasses.png') 16 16, pointer" }
        : undefined;

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
        style={cursorStyle}
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
                className="fixed inset-0 z-999"
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
                  className="absolute inset-0 flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl will-change-[transform,opacity] sm:left-1/2 sm:top-1/2 sm:h-[86vh] sm:max-h-[86vh] sm:w-[min(1100px,92vw)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:border sm:border-black/10"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 bg-white/80 px-4 py-3 backdrop-blur">
                    <div className="flex min-w-0 items-center gap-3">
                      {showPreviewIcon && (
                        <span className="flex shrink-0 self-stretch items-center">
                          <GlassesIcon size={28} className="opacity-80" />
                        </span>
                      )}

                      <div className="min-w-0">
                        <div
                          id={dialogTitleId}
                          className="truncate text-sm font-semibold text-slate-900"
                        >
                          {title}
                        </div>
                        <div className="truncate text-xs text-slate-500">{url}</div>
                      </div>
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

                  <div className="flex-1 min-h-0 bg-slate-50">
                    {isSoilMoistureEmbed ? (
                      <div className="h-full w-full overflow-x-hidden">
                        {soilEmbedReady ? (
                          <soil-moisture-embed
                            mode="demo-onboarding"
                            style={{ display: "block", width: "100%" }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                            Loading demo…
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative h-full w-full">
                        {!iframeLoaded && !iframeError ? (
                          <div className="absolute inset-0 z-10 grid place-items-center bg-slate-50">
                            <div className="flex flex-col items-center gap-3 px-6 text-center">
                              <div className="h-10 w-10 rounded-full border-2 border-slate-300/80 border-t-(--accent) animate-spin" />
                              <div className="text-sm font-medium text-slate-600">
                                Loading preview…
                              </div>
                              <div className="text-xs text-slate-500">
                                This can take a moment.
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {iframeError ? (
                          <div className="absolute inset-0 z-10 grid place-items-center bg-slate-50">
                            <div className="max-w-md px-6 text-center">
                              <div className="text-sm font-semibold text-slate-700">
                                Preview failed to load.
                              </div>
                              <div className="mt-1 text-xs text-slate-500">
                                Try opening it in a new tab.
                              </div>
                            </div>
                          </div>
                        ) : null}

                        <iframe
                          src={iframeUrl}
                          title={title}
                          className="h-full w-full"
                          referrerPolicy="no-referrer"
                          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                          allow="clipboard-read; clipboard-write; fullscreen"
                          onLoad={() => setIframeLoaded(true)}
                          onError={() => setIframeError(true)}
                        />
                      </div>
                    )}
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
