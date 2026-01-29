"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import portfolioItems from "@/data/portfolio";
import AbstractBackdrop from "@/components/AbstractBackdrop";
import { getSiteContent } from "@/data/siteContent";
import { useEffect, useMemo, useRef, useState } from "react";
import OnDemandLivePreviewModal from "@/app/_components/OnDemandLivePreviewModal";
import GlassesBadge from "@/components/GlassesBadge";
import LanguageIcon from "@/components/LanguageIcon";
import CloseIcon from "@/components/CloseIcon";
import {
  getLivePreviewLink,
  isIframeLivePreviewAllowed,
} from "@/app/_components/livePreviewUtils";
import { inferMainLanguage, normalizeLanguageName, parseStackString, splitTechIntoLanguagesAndOther } from "@/lib/tech";

export default function HomeClient({ locale = "en", basePath = "" }) {
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeLanguage, setActiveLanguage] = useState(null);
  const router = useRouter();
  const listRef = useRef(null);
  const siteContent = getSiteContent(locale);

  const scrollToTopOnMobile = () => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(max-width: 767px)")?.matches) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

  const normalizeCategory = (value) =>
    String(value || "")
      .trim()
      .toLowerCase();

  const CATEGORY_PAIR = {
    mobile: "mobile app",
    pwa: "pwa",
  };

  const getCategoryPairSelection = (category) => {
    const normalized = normalizeCategory(category);
    if (normalized === CATEGORY_PAIR.mobile || normalized === CATEGORY_PAIR.pwa) {
      return ["mobile app", "PWA"];
    }
    return [category];
  };

  const setCategorySelection = (category) => {
    setActiveCategories(getCategoryPairSelection(category));
    scrollToTopOnMobile();
  };

  const clearCategorySelection = (category) => {
    setActiveCategories((prev) => {
      const normalized = normalizeCategory(category);
      const next = prev.filter((entry) => normalizeCategory(entry) !== normalized);
      return next;
    });
  };

  const filteredItems = useMemo(() => {
    let items = portfolioItems;
    if (activeCategories.length > 0) {
      const targetCategories = new Set(
        activeCategories.map((category) => normalizeCategory(category))
      );
      items = items.filter((item) =>
        item.categories?.some(
          (category) => targetCategories.has(normalizeCategory(category))
        )
      );
    }
    if (activeLanguage) {
      items = items.filter((item) => {
        const stack = item.stack || "";
        const inferred = inferMainLanguage({
          mainLanguage: item.mainLanguage,
          stack,
        });
        return (
          item.mainLanguage === activeLanguage || 
          item.secondaryLanguage === activeLanguage ||
          inferred === activeLanguage
        );
      });
    }
    return items;
  }, [activeCategories, activeLanguage]);

  const categoryBadgeClassName =
    "inline-flex items-center justify-center px-[0.6rem] py-[0.26rem] text-[0.66rem] font-semibold uppercase tracking-[0.035em] leading-none rounded-full border border-[rgba(155,0,189,0.12)] bg-[rgba(255,255,255,0.8)] text-[#3b1750] shadow-[0_1px_4px_rgba(2,6,23,0.08)] backdrop-blur-[3px] cursor-pointer hover:bg-[rgba(255,255,255,0.9)] hover:border-[rgba(155,0,189,0.18)] md:px-[0.48rem] md:py-[0.14rem] md:text-[0.62rem]";

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
    const spans = Array.from(container.querySelectorAll(".card-stack-typed"));

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
      <main ref={listRef} className="relative mx-auto w-full max-w-6xl flex-1 px-2 py-8 sm:px-3 lg:px-4 min-[1100px]:px-6">
        {(activeCategories.length > 0 || activeLanguage) && (
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            {activeCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`${categoryBadgeClassName} group`}
                onClick={() => {
                  clearCategorySelection(category);
                }}
                aria-label={`Clear filter: ${category}`}
              >
                <span className="category-badge__label">{category}</span>
                <span className="category-badge__close inline-flex items-center justify-center" aria-hidden="true">
                  <CloseIcon size={14} className="opacity-70 group-hover:opacity-100" />
                </span>
              </button>
            ))}
            {activeLanguage && (
              <button
                type="button"
                className={`${categoryBadgeClassName} group`}
                onClick={() => {
                  setActiveLanguage(null);
                }}
                aria-label={`Clear filter: ${activeLanguage}`}
              >
                <span className="category-badge__label">{activeLanguage}</span>
                <span className="category-badge__close inline-flex items-center justify-center" aria-hidden="true">
                  <CloseIcon size={14} className="opacity-70 group-hover:opacity-100" />
                </span>
              </button>
            )}
          </div>
        )}
        <h2 className="sr-only">{siteContent.nav.portfolio}</h2>
        <section className="grid gap-4 justify-center [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] [&>*]:w-full [&>*]:max-w-[384px] [&>*]:justify-self-center min-[1100px]:gap-5 min-[1100px]:[grid-template-columns:repeat(auto-fit,minmax(276px,1fr))]">
          {filteredItems.map((item, index) => {
              const data = item.i18n[locale] || item.i18n.en;
              const href = `${basePath}/${item.slug}`;
              const stack = item.stack || data.stack || "";
              const stackItems = parseStackString(stack);
              const { other: otherStack } = splitTechIntoLanguagesAndOther(stackItems);
              const mainLanguage = inferMainLanguage({
                mainLanguage: item.mainLanguage,
                stack,
              });
              const secondaryLanguage = item.secondaryLanguage
                ? normalizeLanguageName(item.secondaryLanguage)
                : null;
              const liveLink = getLivePreviewLink(data.links);
              const iframeAllowed = liveLink
                ? isIframeLivePreviewAllowed({ slug: item.slug, href: liveLink.href })
                : false;
              // Prioritize first 6 images (typical above-the-fold on most screens)
              const isPriority = index < 6;
              const typography = getCardTypographyByLength({
                title: data.title,
                description: data.description,
              });

              return (
                <article
                  key={item.slug}
                  className="card group relative flex cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-[0px_0px_5px_1px_#dfdfeb] transition-[box-shadow] duration-500 ease-out hover:shadow-[0px_0px_8px_4px_#dedefc] aspect-square"
                  role="link"
                  tabIndex={0}
                  onClick={(e) => openCard(e, href)}
                  onKeyDown={(e) => onCardKeyDown(e, href)}
                >
                  {mainLanguage ? (
                    <>
                      <button
                        type="button"
                        className="absolute -bottom-2 -right-2 z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/85 shadow-sm ring-1 ring-black/10 backdrop-blur cursor-pointer transition-transform hover:scale-105"
                        title={mainLanguage}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveLanguage(mainLanguage);
                          scrollToTopOnMobile();
                        }}
                        aria-label={`Filter by language: ${mainLanguage}`}
                      >
                        <LanguageIcon name={mainLanguage} size={28} className="block text-slate-500" />
                      </button>
                      {secondaryLanguage ? (
                        <button
                          type="button"
                          className="absolute bottom-10 -right-2 z-[9] inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-sm ring-1 ring-black/10 backdrop-blur cursor-pointer transition-transform hover:scale-105"
                          title={secondaryLanguage}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveLanguage(secondaryLanguage);
                            scrollToTopOnMobile();
                          }}
                          aria-label={`Filter by language: ${secondaryLanguage}`}
                        >
                          <LanguageIcon name={secondaryLanguage} size={20} className="block text-slate-500" />
                        </button>
                      ) : null}
                    </>
                  ) : null}
                  <div className="card-link flex flex-1 flex-col text-inherit no-underline">
                    <div className="card-media relative h-[min(180px,50%)] w-full shrink-0 isolation-isolate overflow-hidden">
                      {liveLink && (
                        <div className="absolute right-3 top-3 z-10">
                          {iframeAllowed ? (
                            <OnDemandLivePreviewModal
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
                                setCategorySelection(category);
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
                        className={`card-text mb-3 text-[#5b6472] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [line-clamp:3] overflow-hidden text-ellipsis ${typography.desc}`}
                      >
                        {data.description}
                      </p>
                      <div className="card-footer absolute bottom-0 left-0 right-0 flex h-[2.4rem] flex-col">
                        <div className="card-divider absolute top-0 left-0 right-0 h-px bg-[rgba(15,23,42,0.12)] z-0" aria-hidden="true" />
                        <div className="card-stack-area flex flex-1 items-center min-h-0 px-4 pr-16">
                          <p className="card-footer-text m-0 flex min-w-0 items-center gap-2 text-[0.82em] font-mono text-[#8b93a4] leading-[1.2]">
                            <span className="shrink-0 font-mono text-slate-400">›</span>
                            <span className="card-stack-value min-w-0 flex-1 truncate">
                              <span className="card-stack-typed inline">
                                {otherStack.length ? otherStack.join(", ") : stack}
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
        </section>
      </main>
    </div>
  );
}
