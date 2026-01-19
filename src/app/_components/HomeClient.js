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

    const fitTitle = (title, { maxSize, minSize: minOverride } = {}) => {
      const link = title.querySelector("a");
      if (!link) return;

      const maxFontSize = maxSize ?? 1.15;
      const minSize = minOverride ?? 0.9;
      const precision = 0.01;

      let low = minSize;
      let high = maxFontSize;

      title.style.fontSize = `${high}rem`;

      const computed = window.getComputedStyle(title);
      const lineHeight = parseFloat(computed.lineHeight) || 0;
      if (!lineHeight) return;

      const maxHeight = lineHeight * 2 + 0.5;
      if (title.getBoundingClientRect().height <= maxHeight) return;

      for (let i = 0; i < 14 && high - low > precision; i += 1) {
        const mid = +(low + (high - low) / 2).toFixed(2);
        title.style.fontSize = `${mid}rem`;
        if (title.getBoundingClientRect().height > maxHeight) {
          high = mid;
        } else {
          low = mid;
        }
      }

      title.style.fontSize = `${low}rem`;
      return low;
    };

    const fitDescription = (
      description,
      { maxLines = 3, maxSize: maxOverride, minSize: minOverride } = {}
    ) => {
      const maxSize = maxOverride ?? 0.875;
      const minSize = minOverride ?? 0.8;
      const precision = 0.01;

      let low = minSize;
      let high = maxSize;

      description.style.fontSize = `${high}rem`;

      const computed = window.getComputedStyle(description);
      const lineHeight = parseFloat(computed.lineHeight) || 0;
      if (!lineHeight) return;

      const maxHeight = lineHeight * maxLines + 0.5;
      if (description.getBoundingClientRect().height <= maxHeight) return;

      for (let i = 0; i < 14 && high - low > precision; i += 1) {
        const mid = +(low + (high - low) / 2).toFixed(2);
        description.style.fontSize = `${mid}rem`;
        if (description.getBoundingClientRect().height > maxHeight) {
          high = mid;
        } else {
          low = mid;
        }
      }

      description.style.fontSize = `${low}rem`;
      return low;
    };

    const pxToRem = (px) => {
      const rootFontSize = parseFloat(
        window.getComputedStyle(document.documentElement).fontSize
      );
      return (px / (rootFontSize || 16)) || 0;
    };


    const getPx = (value) => {
      const parsed = parseFloat(value);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const shrinkUntilContentFits = ({ body, title, description, footer }) => {
      if (!footer) return;

      const titleMin = 0.7;
      const descMin = 0.62;
      const step = 0.02;
      const epsilon = 0.5;

      let titleSize = pxToRem(parseFloat(window.getComputedStyle(title).fontSize));
      let descSize = pxToRem(
        parseFloat(window.getComputedStyle(description).fontSize)
      );

      for (let i = 0; i < 36; i += 1) {
        const bodyHeight = body.clientHeight;
        const footerHeight = footer.getBoundingClientRect().height;
        const available = Math.max(0, bodyHeight - footerHeight);

        const titleStyles = window.getComputedStyle(title);
        const descStyles = window.getComputedStyle(description);

        const required =
          title.getBoundingClientRect().height +
          getPx(titleStyles.marginBottom) +
          description.getBoundingClientRect().height +
          getPx(descStyles.marginBottom);

        if (required <= available + epsilon) break;

        if (descSize > descMin + 0.001) {
          descSize = Math.max(descMin, +(descSize - step).toFixed(2));
          description.style.fontSize = `${descSize}rem`;
          continue;
        }

        if (titleSize > titleMin + 0.001) {
          titleSize = Math.max(titleMin, +(titleSize - step).toFixed(2));
          title.style.fontSize = `${titleSize}rem`;
          continue;
        }

        break;
      }
    };

    const fitAllTitles = () => {
      container.querySelectorAll(".card-body").forEach((body) => {
        const title = body.querySelector(".card-title");
        const description = body.querySelector(".card-text");
        const footer = body.querySelector(".card-footer");
        if (!title || !description) return;

        // First pass: fit to the intended clamps without making typography globally smaller.
        fitDescription(description, { maxLines: 3, maxSize: 0.875, minSize: 0.8 });

        const descStyles = window.getComputedStyle(description);
        const descLineHeight = parseFloat(descStyles.lineHeight) || 0;
        const descHeight = description.getBoundingClientRect().height;
        const descLines = descLineHeight
          ? Math.max(1, Math.min(3, Math.ceil((descHeight + 0.01) / descLineHeight)))
          : 2;

        const titleMaxSize = descLines >= 3 ? 1.05 : 1.15;
        fitTitle(title, { maxSize: titleMaxSize, minSize: 0.9 });

        // Second pass: account for footer height and shrink text if needed.
        shrinkUntilContentFits({ body, title, description, footer });
      });
    };

    const timeouts = new Set();
    let rafId = null;

    const scheduleFit = () => {
      fitAllTitles();

      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        fitAllTitles();
      });

      timeouts.forEach((id) => window.clearTimeout(id));
      timeouts.clear();
      timeouts.add(window.setTimeout(() => fitAllTitles(), 250));
      timeouts.add(window.setTimeout(() => fitAllTitles(), 700));
    };

    scheduleFit();
    const observer = new ResizeObserver(() => scheduleFit());
    observer.observe(container);

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleFit).catch(() => undefined);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      timeouts.forEach((id) => window.clearTimeout(id));
      observer.disconnect();
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
            {filteredItems.map((item) => {
              const data = item.i18n[locale] || item.i18n.en;
              const href = `${basePath}/portfolio/${item.slug}`;
              const liveLink = getLivePreviewLink(data.links);
              const iframeAllowed = liveLink
                ? isIframeLivePreviewAllowed({ slug: item.slug, href: liveLink.href })
                : false;
              const custom = cardCustomBySlug.get(item.slug);

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
                              buttonClassName="group pointer-events-none cursor-pointer opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)/30 rounded-md"
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
                              className="pointer-events-none grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-black/10 bg-white/90 text-slate-800 shadow-sm opacity-0 backdrop-blur transition duration-200 hover:bg-white group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)/30"
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
                        <p className="card-footer-text">
                          <span className="font-mono text-slate-400">›</span>{" "}
                          <span className="font-mono">{item.stack || data.stack}</span>
                        </p>
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
