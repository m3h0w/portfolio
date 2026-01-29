"use client";

import { useState } from "react";

export default function OnDemandLivePreviewModal({
  url,
  title,
  openLabel,
  openAriaLabel,
  trigger,
  openInNewTabLabel,
  closeLabel,
  buttonClassName,
  showPreviewIcon,
  cursorVariant,
}) {
  const [LivePreviewModal, setLivePreviewModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!url) return null;

  if (LivePreviewModal) {
    return (
      <LivePreviewModal
        url={url}
        title={title}
        openLabel={openLabel}
        openAriaLabel={openAriaLabel}
        trigger={trigger}
        openInNewTabLabel={openInNewTabLabel}
        closeLabel={closeLabel}
        buttonClassName={buttonClassName}
        showPreviewIcon={showPreviewIcon}
        cursorVariant={cursorVariant}
        defaultOpen
      />
    );
  }

  return (
    <button
      type="button"
      aria-label={
        openAriaLabel || (typeof openLabel === "string" ? openLabel : undefined)
      }
      onClick={async (event) => {
        event.stopPropagation();

        if (isLoading) return;
        setIsLoading(true);

        try {
          const mod = await import("@/app/_components/LivePreviewModal");
          setLivePreviewModal(() => mod.default);
        } finally {
          setIsLoading(false);
        }
      }}
      disabled={isLoading}
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
  );
}
