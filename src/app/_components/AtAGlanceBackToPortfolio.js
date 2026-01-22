"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AtAGlanceBackToPortfolio({ observeId, href, label, enabled = true }) {
  const [show, setShow] = useState(false);

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

  const canShow = enabled && Boolean(href && label) && show;

  return (
    <AnimatePresence initial={false}>
      {canShow && (
        <motion.div
          key="at-a-glance-back"
          initial={{ height: 0, opacity: 0, y: -6 }}
          animate={{ height: "auto", opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
        >
          <Link
            href={href}
            className="inline-flex w-full items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm backdrop-blur transition-[background-color,transform,box-shadow] hover:bg-white active:scale-[0.98] active:bg-slate-50 active:shadow"
          >
            <span aria-hidden className="text-slate-500">
              ←
            </span>
            <span>{label}</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
