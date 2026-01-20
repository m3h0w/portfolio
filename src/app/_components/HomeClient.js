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

  const categoryBadgeClassName =
    "inline-flex items-center justify-center px-[0.48rem] py-[0.14rem] text-[0.62rem] font-semibold uppercase tracking-[0.035em] leading-none rounded-full border border-[rgba(155,0,189,0.12)] bg-[rgba(255,255,255,0.8)] text-[#3b1750] shadow-[0_1px_4px_rgba(2,6,23,0.08)] backdrop-blur-[3px] cursor-pointer hover:bg-[rgba(255,255,255,0.9)] hover:border-[rgba(155,0,189,0.18)]";

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

  const normalizeCardText = (value) => (value || "").replace(/\s+/g, " ").trim();

  const getCardTypographyByLength = ({ title, description }) => {
    const combinedLen =
      normalizeCardText(title).length + normalizeCardText(description).length;

    if (combinedLen <= 90) {
      return {
        // Base styles cover <1100px (compact). Restore the previous sizing at >=1100px.
        title:
          "text-[0.98rem] leading-[1.22] min-[1100px]:text-[1.15rem] min-[1100px]:leading-[1.3]",
        desc:
          "text-[0.88rem] leading-[1.38] min-[1100px]:text-[0.95rem] min-[1100px]:leading-[1.45]",
      };
    }

    if (combinedLen <= 140) {
      return {
        title:
          "text-[0.94rem] leading-[1.2] min-[1100px]:text-[1.08rem] min-[1100px]:leading-[1.28]",
        desc:
          "text-[0.86rem] leading-[1.36] min-[1100px]:text-[0.92rem] min-[1100px]:leading-[1.43]",
      };
    }

    if (combinedLen <= 190) {
      return {
        title:
          "text-[0.9rem] leading-[1.18] min-[1100px]:text-[1.02rem] min-[1100px]:leading-[1.25]",
        desc:
          "text-[0.83rem] leading-[1.34] min-[1100px]:text-[0.89rem] min-[1100px]:leading-[1.4]",
      };
    }

    return {
      title:
        "text-[0.86rem] leading-[1.16] min-[1100px]:text-[0.98rem] min-[1100px]:leading-[1.22]",
      desc:
        "text-[0.8rem] leading-[1.32] min-[1100px]:text-[0.86rem] min-[1100px]:leading-[1.38]",
    };
  };

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
          const id = window.setTimeout(step, 28);
          timers.add(id);
        } else {
          span.setAttribute("data-typed", "true");
        }
      };

      const startId = window.setTimeout(step, 120);
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
              className={`${categoryBadgeClassName} group gap-[0.35rem] px-[0.6rem] py-[0.22rem]`}
              onClick={() => {
                setActiveCategory(null);
                rerollAnimationSeed();
              }}
              aria-label={`Clear filter: ${activeCategory}`}
            >
              <span className="category-badge__label">{activeCategory}</span>
              <span className="category-badge__close" aria-hidden="true">
                <span className="text-[0.95rem] leading-[0.9] opacity-70 mt-[-1px] group-hover:opacity-100">
                  ×
                </span>
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
              const typography = getCardTypographyByLength({
                title: data.title,
                description: data.description,
              });

              return (
                <motion.article
                  key={item.slug}
                  layout
                  custom={custom}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="card group relative flex cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-[0px_0px_5px_1px_#dfdfeb] transition-[box-shadow] duration-500 ease-out hover:shadow-[0px_0px_8px_4px_#dedefc] aspect-square"
                  role="link"
                  tabIndex={0}
                  onClick={(e) => openCard(e, href)}
                  onKeyDown={(e) => onCardKeyDown(e, href)}
                >
                  <div className="card-link flex flex-1 flex-col text-inherit no-underline">
                    <div className="card-media relative h-[min(180px,50%)] w-full shrink-0 isolation-isolate overflow-hidden">
                      {liveLink && (
                        <div className="absolute right-3 top-3 z-10">
                          {iframeAllowed ? (
                            <LivePreviewModal
                              url={liveLink.href}
                              title={data.title}
                              openLabel={siteContent.ui.livePreview}
                              openAriaLabel={siteContent.ui.livePreview}
                              openInNewTabLabel={siteContent.ui.openInNewTab}
                              closeLabel={siteContent.ui.close}
                              showPreviewIcon
                              buttonClassName="group pointer-events-auto cursor-pointer opacity-100 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)/30 rounded-md md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100"
                              cursorVariant="black"
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
                        <div className="card-categories absolute inset-x-0 bottom-0 z-[2] flex flex-wrap gap-[0.35rem] px-[0.65rem] py-[0.5rem] justify-start items-end bg-[linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.55)_100%)]">
                          {item.categories.map((category) => (
                            <button
                              key={category}
                              type="button"
                              className={categoryBadgeClassName}
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
                    <div className="card-body relative flex flex-1 flex-col min-h-0 p-4 pb-[2.9rem]">
                      <h3
                        className={`card-title mb-[0.4rem] font-semibold text-[var(--accent)] transition-colors [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [line-clamp:2] overflow-hidden whitespace-normal group-hover:text-[var(--accent-dark)] ${typography.title}`}
                      >
                        <Link href={href} className="no-underline">
                          {data.title}
                        </Link>
                      </h3>
                      <p
                        className={`card-text mb-3 text-[#5b6472] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [line-clamp:3] overflow-hidden text-ellipsis min-[768px]:hidden min-[1100px]:[display:-webkit-box] ${typography.desc}`}
                      >
                        {data.description}
                      </p>
                      <div className="card-footer absolute bottom-0 left-4 right-4 flex h-[2.4rem] flex-col">
                        <div className="card-divider h-px w-full bg-[rgba(15,23,42,0.12)] m-0" aria-hidden="true" />
                        <div className="card-stack-area flex flex-1 items-center min-h-0">
                          <p className="card-footer-text m-0 block overflow-hidden text-ellipsis whitespace-nowrap text-[0.82em] font-mono text-[#8b93a4] leading-[1.2]">
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
