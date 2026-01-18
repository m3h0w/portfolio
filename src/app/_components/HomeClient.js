"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import portfolioItems from "@/data/portfolio";
import AbstractBackdrop from "@/components/AbstractBackdrop";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HomeClient({ locale = "en", basePath = "" }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const router = useRouter();

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

  const cardMotion = {
    initial: { opacity: 0, scale: 0.94, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -8 },
  };

  const filteredItems = useMemo(() => {
    if (!activeCategory) return portfolioItems;
    return portfolioItems.filter((item) => item.categories?.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen flex-1">
      <AbstractBackdrop variant="list" />
      <main className="relative mx-auto w-full max-w-6xl flex-1 px-2 py-8 sm:px-4 lg:px-6">
        {activeCategory && (
          <div className="mb-5 flex items-center gap-2">
            <button
              type="button"
              className="category-badge category-badge--filter"
              onClick={() => setActiveCategory(null)}
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
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredItems.map((item) => {
              const data = item.i18n[locale] || item.i18n.en;
              const href = `${basePath}/portfolio/${item.slug}`;

              return (
                <motion.article
                  key={item.slug}
                  layout
                  variants={cardMotion}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.6 }}
                  className="card group cursor-pointer"
                  role="link"
                  tabIndex={0}
                  onClick={(e) => openCard(e, href)}
                  onKeyDown={(e) => onCardKeyDown(e, href)}
                >
                  <div className="card-link">
                    <div className="card-media overflow-hidden">
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
                      <p className="card-footer-text">
                        <span className="font-mono text-slate-400">›</span>{" "}
                        <span className="font-mono">{data.stack}</span>
                      </p>
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
