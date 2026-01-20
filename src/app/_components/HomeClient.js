"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import portfolioItems from "@/data/portfolio";
import AbstractBackdrop from "@/components/AbstractBackdrop";
import { getSiteContent } from "@/data/siteContent";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LivePreviewModal from "@/app/_components/LivePreviewModal";
import GlassesBadge from "@/components/GlassesBadge";
import {
  getLivePreviewLink,
  isIframeLivePreviewAllowed,
} from "@/app/_components/livePreviewUtils";

export default function HomeClient({ locale = "en", basePath = "" }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [animationSeed, setAnimationSeed] = useState(() => `initial-${locale}`);
  const router = useRouter();
  const listRef = useRef(null);
  const siteContent = getSiteContent(locale);

  const rerollAnimationSeed = () => {
    if (globalThis.crypto?.randomUUID) {
      setAnimationSeed(globalThis.crypto.randomUUID());
      return;
    }
    setAnimationSeed(Math.random().toString(36).slice(2));
  };

  const hashToUnit = (value) => {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 1000) / 1000;
  };

  const selectionExistsInside = (container) => {
    const selection = window.getSelection?.();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return false;

    const selectedText = selection.toString();
    if (!selectedText || selectedText.trim().length === 0) return false;

    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;
    return container?.contains?.(commonAncestor) ?? false;
  };

  const openCard = (event, href) => {
    if (event.defaultPrevented) return;
    if (selectionExistsInside(event.currentTarget)) return;

    if (event.metaKey || event.ctrlKey) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    if (event.shiftKey || event.altKey) return;

    router.push(href);
  };

  const onCardKeyDown = (event, href) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    router.push(href);
  };

  const cardVariants = {
    hidden: (custom) => ({
      opacity: "1",
      y: custom?.y ?? 18,
      scale: custom?.scale ?? 0.98,
    }),
    visible: (custom) => ({
      opacity: "1",
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 520,
        damping: 38,
        mass: 0.6,
        delay: custom?.delay ?? 0,
      },
    }),
  };

  const filteredItems = useMemo(() => {
    if (!activeCategory) return portfolioItems;
    return portfolioItems.filter((item) => item.categories?.includes(activeCategory));
  }, [activeCategory]);

  const cardCustomBySlug = useMemo(() => {
    const map = new Map();
    filteredItems.forEach((item) => {
      const unit = hashToUnit(`${animationSeed}:${item.slug}`);
      map.set(item.slug, {
        delay: 0.02 + unit * 0.32,
        y: 12 + unit * 28,
        scale: 0.965 + unit * 0.03,
      });
    });
    return map;
  }, [filteredItems, animationSeed]);

  useEffect(() => {
    // Avoid hydration mismatches: seed must be deterministic for SSR + first client render.
    // After mount, we can safely randomize to keep the animation feeling organic.
    const nextSeed = globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : Math.random().toString(36).slice(2);

    const raf = window.requestAnimationFrame(() => {
      setAnimationSeed(nextSeed);
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const FOOTER_HEIGHT = 2.4; // rem
    const CARD_BODY_PADDING = 1; // rem (top and sides, bottom has extra for footer)

    const remToPx = (rem) => {
      const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      return rem * (rootSize || 16);
    };

    const fitCard = (body) => {
      const title = body.querySelector(".card-title");
      const description = body.querySelector(".card-text");
      if (!title || !description) return;

      // Calculate available vertical space
      const bodyHeight = body.clientHeight;
      const footerPx = remToPx(FOOTER_HEIGHT);
      const availableHeight = bodyHeight - footerPx - 10; // 10px safety margin

      // Binary search for title font size
      const fitTitle = (maxSize, minSize) => {
        let low = minSize;
        let high = maxSize;
        const precision = 0.01;

        for (let i = 0; i < 16 && high - low > precision; i += 1) {
          const mid = +(low + (high - low) / 2).toFixed(2);
          title.style.fontSize = `${mid}rem`;
          const titleHeight = title.getBoundingClientRect().height;
          
          const titleStyles = window.getComputedStyle(title);
          const titleBottom = titleHeight + parseFloat(titleStyles.marginBottom || 0);

          if (titleBottom > availableHeight * 0.35) { // Title can use up to 35% of space
            high = mid;
          } else {
            low = mid;
          }
        }
        title.style.fontSize = `${low}rem`;
        return low;
      };

      // Binary search for description font size
      const fitDescription = (maxSize, minSize) => {
        let low = minSize;
        let high = maxSize;
        const precision = 0.01;

        for (let i = 0; i < 16 && high - low > precision; i += 1) {
          const mid = +(low + (high - low) / 2).toFixed(2);
          description.style.fontSize = `${mid}rem`;
          const descHeight = description.getBoundingClientRect().height;
          
          const descStyles = window.getComputedStyle(description);
          const descBottom = descHeight + parseFloat(descStyles.marginBottom || 0);

          if (descBottom > availableHeight * 0.5) { // Description can use up to 50% of space
            high = mid;
          } else {
            low = mid;
          }
        }
        description.style.fontSize = `${low}rem`;
        return low;
      };

      // Fit description first
      fitDescription(0.875, 0.7);

      // Then fit title
      const descStyles = window.getComputedStyle(description);
      const descLineHeight = parseFloat(descStyles.lineHeight) || 0;
      const descHeight = description.getBoundingClientRect().height;
      const descLines = descLineHeight > 0
        ? Math.round(descHeight / descLineHeight)
        : 2;

      const titleMaxSize = descLines >= 3 ? 1.0 : 1.1;
      fitTitle(titleMaxSize, 0.8);

      // Final check: if content still overflows, shrink both more aggressively
      const titleHeight = title.getBoundingClientRect().height;
      const titleMargin = parseFloat(window.getComputedStyle(title).marginBottom || 0);
      const descMargin = parseFloat(window.getComputedStyle(description).marginBottom || 0);
      const totalContent = titleHeight + titleMargin + descHeight + descMargin;

      if (totalContent > availableHeight) {
        const scale = Math.min(0.95, availableHeight / totalContent);
        const currentTitleSize = parseFloat(title.style.fontSize);
        const currentDescSize = parseFloat(description.style.fontSize);
        title.style.fontSize = `${(currentTitleSize * scale).toFixed(2)}rem`;
        description.style.fontSize = `${(currentDescSize * scale).toFixed(2)}rem`;
      }
    };

    const fitAllCards = () => {
      container.querySelectorAll(".card-body").forEach(fitCard);
    };

    fitAllCards();
    const observer = new ResizeObserver(fitAllCards);
    observer.observe(container);

    if (document.fonts?.ready) {
      document.fonts.ready.then(fitAllCards).catch(() => undefined);
    }

    return () => observer.disconnect();
  }, [filteredItems, locale]);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const timers = new Set();
    const spans = Array.from(container.querySelectorAll(".card-stack-text"));

    spans.forEach((span) => {
      const fullText = span.getAttribute("data-full-text") || span.textContent || "";
      if (!fullText.trim()) return;

      if (prefersReducedMotion) {
        span.textContent = fullText;
        span.setAttribute("data-full-text", fullText);
        span.setAttribute("data-typed", "true");
        return;
      }

      if (span.getAttribute("data-full-text") === fullText && span.getAttribute("data-typed") === "true") {
        return;
      }

      span.setAttribute("data-full-text", fullText);
      span.setAttribute("data-typed", "false");
      span.textContent = "";

      let index = 0;
      const step = () => {
        index += 1;
        span.textContent = fullText.slice(0, index);
        if (index < fullText.length) {
          const id = window.setTimeout(step, 18);
          timers.add(id);
        } else {
          span.setAttribute("data-typed", "true");
        }
      };

      const startId = window.setTimeout(step, 60);
      timers.add(startId);
    });

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [filteredItems, locale]);


  return (
    <div className="relative min-h-screen flex-1">
      <AbstractBackdrop variant="list" />
      <main ref={listRef} className="relative mx-auto w-full max-w-6xl flex-1 px-2 py-8 sm:px-4 lg:px-6">
        {activeCategory && (
          <div className="mb-5 flex items-center gap-2">
            <button
              type="button"
              className="category-badge category-badge--filter"
              onClick={() => {
                setActiveCategory(null);
                rerollAnimationSeed();
              }}
              aria-label={`Clear filter: ${activeCategory}`}
            >
              <span className="category-badge__label">{activeCategory}</span>
              <span className="category-badge__close" aria-hidden="true">
                ×
              </span>
            </button>
          </div>
        )}
        <motion.section layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const data = item.i18n[locale] || item.i18n.en;
              const href = `${basePath}/${item.slug}`;
              const liveLink = getLivePreviewLink(data.links);
              const iframeAllowed = liveLink
                ? isIframeLivePreviewAllowed({ slug: item.slug, href: liveLink.href })
                : false;
              const custom = cardCustomBySlug.get(item.slug);
              // Prioritize first 6 images (typical above-the-fold on most screens)
              const isPriority = index < 6;

              return (
                <motion.article
                  key={item.slug}
                  layout
                  custom={custom}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="card group cursor-pointer"
                  role="link"
                  tabIndex={0}
                  onClick={(e) => openCard(e, href)}
                  onKeyDown={(e) => onCardKeyDown(e, href)}
                >
                  <div className="card-link">
                    <div className="card-media overflow-hidden">
                      {liveLink && (
                        <div className="absolute right-3 top-3 z-10">
                          {iframeAllowed ? (
                            <LivePreviewModal
                              url={liveLink.href}
                              title={`${data.title} — ${siteContent.ui.livePreview}`}
                              openLabel={siteContent.ui.livePreview}
                              openAriaLabel={siteContent.ui.livePreview}
                              openInNewTabLabel={siteContent.ui.openInNewTab}
                              closeLabel={siteContent.ui.close}
                              buttonClassName="group pointer-events-auto cursor-pointer opacity-100 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)/30 rounded-md md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100"
                              trigger={
                                <>
                                  <span className="sr-only">{siteContent.ui.livePreview}</span>
                                  <GlassesBadge
                                    size={40}
                                    iconSize={30}
                                    className="transition-[box-shadow,transform] duration-200 ease-out transform-gpu group-hover:scale-[1.06] group-hover:shadow-md group-hover:ring-slate-300/80"
                                  />
                                </>
                              }
                            />
                          ) : (
                            <a
                              href={liveLink.href}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={siteContent.ui.openInNewTab}
                              title={siteContent.ui.openInNewTab}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                window.open(liveLink.href, "_blank", "noopener,noreferrer");
                              }}
                              className="pointer-events-auto grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-black/10 bg-white/90 text-slate-800 shadow-sm opacity-100 backdrop-blur transition duration-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)/30 md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100"
                            >
                              <span aria-hidden className="text-base leading-none">
                                ↗
                              </span>
                            </a>
                          )}
                        </div>
                      )}
                      <Image
                        src={data.thumbnail}
                        alt={data.title}
                        fill
                        priority={isPriority}
                        fetchPriority={isPriority ? "high" : "low"}
                        className={`object-cover transition duration-300 group-hover:scale-105 ${item.cover ? "object-top" : ""}`}
                      />
                      {item.categories && item.categories.length > 0 && (
                        <div className="card-categories card-categories--media">
                          {item.categories.map((category) => (
                            <button
                              key={category}
                              type="button"
                              className="category-badge"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setActiveCategory(category);
                                rerollAnimationSeed();
                              }}
                              aria-label={`Filter by category: ${category}`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">
                        <Link href={href} className="no-underline">
                          {data.title}
                        </Link>
                      </h3>
                      <p className="card-text text-sm text-slate-600">{data.description}</p>
                      <div className="card-footer">
                        <div className="card-divider" aria-hidden="true" />
                        <div className="card-stack-area">
                          <p className="card-footer-text">
                            <span className="font-mono text-slate-400">›</span>{" "}
                            <span className="card-stack-text font-mono">{item.stack || data.stack}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.section>
      </main>
    </div>
  );
}
