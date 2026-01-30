"use client";

import { useEffect, useMemo, useState } from "react";
import LivePreviewModal from "@/app/_components/LivePreviewModal";
import { LinkIcon } from "@/app/_components/AtAGlanceLinks";
import GlassesIcon from "@/components/GlassesIcon";
import {
  isIframeLivePreviewAllowed,
  isLivePreviewLink,
  isReportPreviewLink,
} from "@/app/_components/livePreviewUtils";

export default function ProjectActions({
  containerId,
  observeId,
  links,
  liveLink,
  iframeAllowed,
  projectTitle,
  projectSlug,
  labels,
  primaryButtonClassName,
  secondaryButtonClassName,
  className = "",
  stacked = false,
  requiresSticky = false,
  stickyQuery = "(min-width: 1280px)",
}) {
  const [show, setShow] = useState(!observeId);
  const [stickyReady, setStickyReady] = useState(!requiresSticky);

  useEffect(() => {
    if (!requiresSticky) return undefined;
    if (typeof window === "undefined") return undefined;

    const media = window.matchMedia(stickyQuery);
    const sync = () => setStickyReady(media.matches);
    sync();

    if (media.addEventListener) {
      media.addEventListener("change", sync);
      return () => media.removeEventListener("change", sync);
    }

    media.addListener(sync);
    return () => media.removeListener(sync);
  }, [requiresSticky, stickyQuery]);

  useEffect(() => {
    if (!observeId) return undefined;
    const element = document.getElementById(observeId);
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [observeId]);

  const liveSiteLink = useMemo(
    () => (links || []).find((link) => link?.preview === false),
    [links],
  );

  const actionLinks = useMemo(() => {
    const safeLinks = (links || []).filter((link) => !link?.preview);

    return safeLinks.filter((link) => {
      if (liveLink && iframeAllowed && link?.href === liveLink.href) return false;
      if (liveLink && link?.href === liveLink.href && link?.label === liveLink.label) {
        return false;
      }

      // If we already render the primary "live site" link beside the preview modal,
      // don't duplicate it in the secondary list.
      if (
        liveSiteLink &&
        link?.href === liveSiteLink.href &&
        link?.label === liveSiteLink.label
      ) {
        return false;
      }
      return true;
    });
  }, [links, liveLink, iframeAllowed, liveSiteLink]);

  const hasActions = Boolean(liveLink) || actionLinks.length > 0;
  if (!hasActions || !show || !stickyReady) return null;

  const containerClassName = stacked
    ? `flex flex-col items-stretch gap-2 ${className}`
    : `flex flex-wrap items-center gap-2 ${className}`;

  const primaryClassName = stacked
    ? `${primaryButtonClassName} w-full justify-between`
    : primaryButtonClassName;

  const secondaryClassName = stacked
    ? `${secondaryButtonClassName} w-full justify-between`
    : secondaryButtonClassName;

  return (
    <div id={containerId} className={containerClassName}>
      {liveLink && iframeAllowed ? (
        <>
          <LivePreviewModal
            url={liveLink.href}
            title={projectTitle}
            openLabel={liveLink.label || labels.livePreview}
            openInNewTabLabel={labels.openInNewTab}
            closeLabel={labels.close}
            showPreviewIcon
            previewType={liveLink.previewType}
            trigger={
              <span className="flex items-center gap-2">
                <LinkIcon
                  href={liveLink.href}
                  label={liveLink.label || labels.livePreview}
                  className="h-4 w-4 text-white"
                />
                <span>{liveLink.label || labels.livePreview}</span>
                <GlassesIcon
                  size={16}
                  className="shrink-0 opacity-90 brightness-0 invert transition-opacity group-hover:opacity-100"
                />
              </span>
            }
            buttonClassName={`group ${primaryClassName}`}
            cursorVariant="white"
          />

          <a
            href={liveSiteLink?.href || liveLink.href}
            target="_blank"
            rel="noreferrer"
            className={secondaryClassName}
          >
            <LinkIcon
              href={liveSiteLink?.href || liveLink.href}
              label={liveSiteLink?.label || labels.openLiveSite}
            />
            {liveSiteLink?.label || labels.openLiveSite}
            <span aria-hidden>↗</span>
          </a>
        </>
      ) : null}

      {liveLink && !iframeAllowed ? (
        <a
          href={liveLink.href}
          target="_blank"
          rel="noreferrer"
          className={primaryClassName}
        >
          <LinkIcon
            href={liveLink.href}
            label={labels.livePreview}
            className="h-4 w-4 text-white"
          />
          {labels.livePreview}
          <span aria-hidden>↗</span>
        </a>
      ) : null}

      {actionLinks.map((link) => {
        const allowInlinePreview =
          isLivePreviewLink(link) &&
          isIframeLivePreviewAllowed({ slug: projectSlug, href: link.href });

        const allowReportPreview = isReportPreviewLink(link);

        if (allowInlinePreview || allowReportPreview) {
          return (
            <LivePreviewModal
              key={`preview-${link.label}`}
              url={link.href}
              title={allowInlinePreview ? projectTitle : `${projectTitle} — ${link.label}`}
              openLabel={link.label}
              openInNewTabLabel={labels.openInNewTab}
              closeLabel={labels.close}
              showPreviewIcon
              trigger={
                <span className="flex items-center gap-2">
                  <LinkIcon href={link.href} label={link.label} />
                  <span>{link.label}</span>
                  <GlassesIcon
                    size={16}
                    className="shrink-0 opacity-70 transition-[opacity,filter] group-hover:opacity-95 group-hover:brightness-0"
                  />
                </span>
              }
              buttonClassName={`group ${secondaryClassName}`}
              cursorVariant="black"
            />
          );
        }

        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={secondaryClassName}
          >
            <LinkIcon href={link.href} label={link.label} />
            {link.label}
            <span aria-hidden>↗</span>
          </a>
        );
      })}
    </div>
  );
}
