import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AbstractBackdrop from "@/components/AbstractBackdrop";
import portfolioItems from "@/data/portfolio";
import { getSiteContent } from "@/data/siteContent";
import styles from "@/app/projects/[slug]/page.module.css";
import LivePreviewModal from "@/app/_components/LivePreviewModal";
import AtAGlanceLinks, { LinkIcon } from "@/app/_components/AtAGlanceLinks";
import AtAGlanceBackToPortfolio from "@/app/_components/AtAGlanceBackToPortfolio";
import GlassesIcon from "@/components/GlassesIcon";
import IMAGE_LQIP_MAP from "@/data/imageLqipMap";
import LqipImage from "@/app/_components/LqipImage";
import {
  getLivePreviewLink,
  isIframeLivePreviewAllowed,
  isLivePreviewLink,
  isReportPreviewLink,
} from "@/app/_components/livePreviewUtils";

const FALLBACK_BLUR_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0' filter='url(%23b)'/%3E%3C/svg%3E";

function getBlurDataURL(src) {
  if (typeof src !== "string") return FALLBACK_BLUR_DATA_URL;
  return IMAGE_LQIP_MAP[src] || FALLBACK_BLUR_DATA_URL;
}

function CountryFlag({ country, className = "" }) {
  const clipId = `country-flag-${country.replace(/\s/g, "-").toLowerCase()}`;

  // Denmark
  if (country === "Denmark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <defs>
          <clipPath id={clipId}>
            <circle cx="12" cy="12" r="10" />
          </clipPath>
        </defs>
        <circle cx="12" cy="12" r="10" fill="#c60c30" />
        <g clipPath={`url(#${clipId})`}>
          {/* Red background */}
          <rect x="0" y="0" width="24" height="24" fill="#c60c30" />
          {/* White cross */}
          <rect x="0" y="9" width="24" height="6" fill="#ffffff" />
          <rect x="7" y="0" width="4" height="24" fill="#ffffff" />
        </g>
        <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(15,23,42,0.08)" />
      </svg>
    );
  }

  // Poland
  if (country === "Poland") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <defs>
          <clipPath id={clipId}>
            <circle cx="12" cy="12" r="10" />
          </clipPath>
        </defs>
        <circle cx="12" cy="12" r="10" fill="#ffffff" />
        <g clipPath={`url(#${clipId})`}>
          <rect x="2" y="2" width="20" height="10" fill="#ffffff" />
          <rect x="2" y="12" width="20" height="10" fill="#dc2626" />
        </g>
        <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(15,23,42,0.08)" />
      </svg>
    );
  }

  // United States
  if (country === "United States") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <defs>
          <clipPath id={clipId}>
            <circle cx="12" cy="12" r="10" />
          </clipPath>
        </defs>
        <circle cx="12" cy="12" r="10" fill="#ffffff" />
        <g clipPath={`url(#${clipId})`}>
          {/* Stripes */}
          <rect x="2" y="2" width="20" height="1.54" fill="#b22234" />
          <rect x="2" y="3.54" width="20" height="1.54" fill="#ffffff" />
          <rect x="2" y="5.08" width="20" height="1.54" fill="#b22234" />
          <rect x="2" y="6.62" width="20" height="1.54" fill="#ffffff" />
          <rect x="2" y="8.16" width="20" height="1.54" fill="#b22234" />
          <rect x="2" y="9.7" width="20" height="1.54" fill="#ffffff" />
          <rect x="2" y="11.24" width="20" height="1.54" fill="#b22234" />
          <rect x="2" y="12.78" width="20" height="1.54" fill="#ffffff" />
          <rect x="2" y="14.32" width="20" height="1.54" fill="#b22234" />
          <rect x="2" y="15.86" width="20" height="1.54" fill="#ffffff" />
          <rect x="2" y="17.4" width="20" height="1.54" fill="#b22234" />
          <rect x="2" y="18.94" width="20" height="1.54" fill="#ffffff" />
          <rect x="2" y="20.48" width="20" height="1.52" fill="#b22234" />
          {/* Blue canton */}
          <rect x="2" y="2" width="9" height="8.7" fill="#3c3b6e" />
        </g>
        <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(15,23,42,0.08)" />
      </svg>
    );
  }

  // Global (globe icon)
  if (country === "Global") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <circle cx="12" cy="12" r="10" fill="#0ea5e9" stroke="rgba(15,23,42,0.08)" />
        <g opacity="0.9">
          <path
            d="M12 2a10 10 0 0 0 0 20M12 2a10 10 0 0 1 0 20M2 12h20"
            stroke="#ffffff"
            strokeWidth="1.2"
            fill="none"
          />
          <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#ffffff" strokeWidth="1.2" fill="none" />
        </g>
      </svg>
    );
  }

  return null;
}

function WorkKindIcon({ kind, size = 16, className = "" }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": true,
  };

  switch (kind) {
    case "company":
      return (
        <svg {...commonProps}>
          <path
            d="M10 6h4a2 2 0 0 1 2 2v2h-8V8a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 10h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 13h6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "school":
      return (
        <svg {...commonProps}>
          <path
            d="M12 3 2 8l10 5 10-5-10-5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M6 10v6c0 2 12 2 12 0v-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M22 8v6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "community":
      return (
        <svg {...commonProps}>
          <path
            d="M8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 20a5.5 5.5 0 0 1 11 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10.5 20a5.5 5.5 0 0 1 11 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "selfEmployment":
    default:
      return (
        <svg {...commonProps}>
          <path
            d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M4 21a8 8 0 0 1 16 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

const renderContentBlock = (block) => {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-10 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3 className="mt-7 text-lg font-semibold tracking-tight text-slate-900">
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p
          className="mt-4 text-[15px] leading-7 text-slate-700 sm:text-base"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "list":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-slate-700 sm:pl-6 sm:text-base">
          {block.items.map((item) => (
            <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    case "orderedList":
      return (
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-[15px] text-slate-700 sm:pl-6 sm:text-base">
          {block.items.map((item) => (
            <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      );
    case "image":
      // Use LQIP for any inline content images to avoid a white flash.
      const contentBlurDataURL = getBlurDataURL(block.src);
      return (
        <figure className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-md shadow-slate-200/60">
            <LqipImage
              src={block.src}
              alt={block.alt}
              width={1200}
              height={800}
              placeholder="blur"
              blurDataURL={contentBlurDataURL}
              className="h-auto w-full object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
};

export function getPortfolioDetailMetadata({ slug, locale }) {
  const item = portfolioItems.find((entry) => entry.slug === slug);
  if (!item) {
    return { title: locale === "pl" ? "Nie znaleziono" : "Project Not Found" };
  }

  const data = item.i18n[locale] || item.i18n.en;
  const siteContent = getSiteContent(locale);

  return {
    title: `${data.title} | ${siteContent.name}`,
    description: data.description,
  };
}

export default function LocalizedPortfolioDetailPage({ slug, locale }) {
  const basePath = locale === "pl" ? "/pl" : "";
  const item = portfolioItems.find((entry) => entry.slug === slug);
  if (!item) {
    notFound();
  }


  const data = item.i18n[locale] || item.i18n.en;
  const siteContent = getSiteContent(locale);

  const heroBlurDataURL = getBlurDataURL(data.heroImage);

  const currentIndex = portfolioItems.findIndex((entry) => entry.slug === slug);
  const prevItem = currentIndex > 0 ? portfolioItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex >= 0 && currentIndex < portfolioItems.length - 1
      ? portfolioItems[currentIndex + 1]
      : null;

  const prevData = prevItem ? prevItem.i18n[locale] || prevItem.i18n.en : null;
  const nextData = nextItem ? nextItem.i18n[locale] || nextItem.i18n.en : null;


  const liveLink = getLivePreviewLink(data.links);
  const iframeAllowed = liveLink
    ? isIframeLivePreviewAllowed({ slug: item.slug, href: liveLink.href })
    : false;

  const primaryButtonClassName =
    "inline-flex cursor-pointer items-center gap-2 rounded-full bg-(--accent) px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-(--accent-dark)";

  const secondaryButtonClassName =
    "inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur hover:bg-white";

  const primaryPreviewButtonClassName = `group ${primaryButtonClassName}`;
  const secondaryPreviewButtonClassName = `group ${secondaryButtonClassName}`;

  const actionLinks = (data.links || []).filter((link) => {
    if (link?.preview) return false;

    // If we can show the live preview modal, it already contains an "Open in new tab"
    // action — so we hide any duplicate external link for the same URL.
    if (liveLink && iframeAllowed && link?.href === liveLink.href) return false;

    // Avoid duplicating the exact liveLink entry.
    if (liveLink && link?.href === liveLink.href && link?.label === liveLink.label) {
      return false;
    }

    return true;
  });
  const topActionsId = "portfolio-detail-top-actions";

  const stack = item.stack || data.stack || "";

  const stackItems = stack
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <div className={`${styles.page} min-h-screen`}>
      <AbstractBackdrop variant="detail" />

      <main
        className={`${styles.shell} mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8`}
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <Link
            href={`${basePath}/`}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur hover:bg-white"
          >
            <span aria-hidden>←</span>
            {siteContent.ui.backToPortfolio}
          </Link>

          <div
            id={topActionsId}
            className="flex flex-wrap items-center justify-center gap-2 sm:justify-end"
          >
            {liveLink && iframeAllowed && (
              <>
                <LivePreviewModal
                  url={liveLink.href}
                  title={data.title}
                  openLabel={siteContent.ui.livePreview}
                  openInNewTabLabel={siteContent.ui.openInNewTab}
                  closeLabel={siteContent.ui.close}
                  showPreviewIcon
                  trigger={
                    <span className="flex items-center gap-2">
                      <LinkIcon
                        href={liveLink.href}
                        label={siteContent.ui.livePreview}
                        className="h-4 w-4 text-white"
                      />
                      <span>{siteContent.ui.livePreview}</span>
                      <GlassesIcon
                        size={16}
                        className="shrink-0 opacity-90 brightness-0 invert transition-opacity group-hover:opacity-100"
                      />
                    </span>
                  }
                  buttonClassName={primaryPreviewButtonClassName}
                  cursorVariant="white"
                />

                <a
                  href={liveLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className={secondaryButtonClassName}
                >
                  <LinkIcon href={liveLink.href} label={siteContent.ui.openLiveSite} />
                  {siteContent.ui.openLiveSite}
                  <span aria-hidden>↗</span>
                </a>
              </>
            )}

            {liveLink && !iframeAllowed && (
              <a
                href={liveLink.href}
                target="_blank"
                rel="noreferrer"
                className={primaryButtonClassName}
              >
                <LinkIcon
                  href={liveLink.href}
                  label={siteContent.ui.livePreview}
                  className="h-4 w-4 text-white"
                />
                {siteContent.ui.livePreview}
                <span aria-hidden>↗</span>
              </a>
            )}

            {actionLinks && actionLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {actionLinks.map((link) => {
                  const allowInlinePreview =
                    isLivePreviewLink(link) &&
                    isIframeLivePreviewAllowed({ slug: item.slug, href: link.href });

                  const allowReportPreview = isReportPreviewLink(link);

                  if (allowInlinePreview || allowReportPreview) {
                    return (
                      <LivePreviewModal
                        key={`preview-${link.label}`}
                        url={link.href}
                        title={allowInlinePreview ? data.title : `${data.title} — ${link.label}`}
                        openLabel={link.label}
                        openInNewTabLabel={siteContent.ui.openInNewTab}
                        closeLabel={siteContent.ui.close}
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
                        buttonClassName={secondaryPreviewButtonClassName}
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
                      className={secondaryButtonClassName}
                    >
                      <LinkIcon href={link.href} label={link.label} />
                      {link.label}
                      <span aria-hidden>↗</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <article className={`${styles.surface} ${styles.enterMain} p-5 sm:p-7`}>
            <div className={styles.hero}>
              <LqipImage
                src={data.heroImage}
                alt={data.title}
                width={1600}
                height={1000}
                placeholder="blur"
                blurDataURL={heroBlurDataURL}
                className="h-auto w-full object-cover"
                priority
              />
            </div>

            <header className="mt-6">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {data.title}
              </h1>

              {data.subtitle && (
                <p className="mt-2 text-sm text-slate-600 sm:text-base">
                  {data.subtitle}
                </p>
              )}

              {data.description && (
                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-700 sm:text-base">
                  {data.description}
                </p>
              )}

              {stackItems.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {stackItems.map((tech) => (
                    <span key={tech} className={styles.chip}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <section className="mt-8 [&_a]:text-(--accent) [&_a]:no-underline [&_a]:transition-colors [&_a:hover]:text-(--accent-dark)">
              {data.content.map((block, index) => (
                <div key={`${block.type}-${index}`}>
                  {renderContentBlock(block)}
                </div>
              ))}
            </section>
          </article>

          <aside className="lg:sticky lg:top-8">
            <div className="space-y-3">
              <div className={`${styles.surface} ${styles.enterAside} p-5 sm:p-6`}>
                <div className="space-y-3 text-sm text-slate-700">
                  {item?.work?.kind && (
                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        {siteContent.ui.type}
                      </div>
                      <div className="mt-1 inline-flex items-center gap-2">
                        <WorkKindIcon
                          kind={item.work.kind}
                          size={16}
                          className="opacity-70"
                        />
                        <span>
                          {siteContent.ui.workKindDescriptions?.[item.work.kind] ||
                            siteContent.ui.workKinds?.[item.work.kind] ||
                            data.subtitle}
                        </span>
                      </div>
                    </div>
                  )}

                  {item?.work?.entity &&
                  (item?.work?.kind === "company" || item?.work?.kind === "school") && (
                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        {siteContent.ui.madeAt}
                      </div>
                      <div className="mt-1 inline-flex items-center gap-2">
                        {item?.country && (
                          <CountryFlag country={item.country} className="h-5 w-5 shrink-0" />
                        )}
                        <span>{item.work.entity}</span>
                      </div>
                    </div>
                  )}

                  {stack && (
                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        {siteContent.ui.stack}
                      </div>
                      <div className={`mt-1 ${styles.kbd}`}>{stack}</div>
                    </div>
                  )}

                  <AtAGlanceLinks
                    observeId={topActionsId}
                    links={data.links}
                    projectTitle={data.title}
                    projectSlug={item.slug}
                    headingLabel={siteContent.ui.links}
                    openInNewTabLabel={siteContent.ui.openInNewTab}
                    closeLabel={siteContent.ui.close}
                  />
                </div>
              </div>

              <AtAGlanceBackToPortfolio
                observeId={topActionsId}
                href={`${basePath}/`}
                label={siteContent.ui.backToPortfolio}
                enabled={Boolean(data.links && data.links.length > 0)}
              />
            </div>
          </aside>
        </div>

        {(prevItem || nextItem) && (
          <nav aria-label="Project navigation" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {prevItem && prevData ? (
                <Link
                  href={`${basePath}/${prevItem.slug}`}
                  className={`${styles.surface} group flex w-full min-w-0 items-center gap-4 overflow-hidden p-4 transition sm:p-5 hover:-translate-y-px hover:shadow-md hover:shadow-slate-200/70`}
                >
                  <div aria-hidden className="text-slate-400">
                    ←
                  </div>
                  <div className="min-w-0 flex-1 text-right">
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                      {siteContent.ui.previousProject}
                    </div>
                    <div className="mt-1 truncate text-base font-semibold text-slate-900 group-hover:text-(--accent-dark)">
                      {prevData.title}
                    </div>
                    {prevData.subtitle && (
                      <div className="mt-1 text-sm text-slate-600">
                        {prevData.subtitle}
                      </div>
                    )}
                  </div>
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white">
                    <LqipImage
                      src={prevData.thumbnail || prevData.heroImage}
                      alt={prevData.title}
                      width={360}
                      height={240}
                      placeholder="blur"
                      blurDataURL={getBlurDataURL(prevData.thumbnail || prevData.heroImage)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
              ) : (
                <Link
                  href={`${basePath}/me`}
                  className={`${styles.surface} group flex w-full min-w-0 items-center gap-4 overflow-hidden p-4 transition sm:p-5 hover:-translate-y-px hover:shadow-md hover:shadow-slate-200/70`}
                >
                  <div aria-hidden className="text-slate-400">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 21a8 8 0 0 1 16 0"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1 text-right">
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                      {siteContent.nav.aboutMe}
                    </div>
                    <div className="mt-1 truncate text-base font-semibold text-slate-900 group-hover:text-(--accent-dark)">
                      {siteContent.name}
                    </div>
                    {siteContent.title && (
                      <div className="mt-1 text-sm text-slate-600">
                        {siteContent.title}
                      </div>
                    )}
                  </div>
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white">
                    <LqipImage
                      src={siteContent.about.image.src}
                      alt={siteContent.about.image.alt}
                      width={360}
                      height={240}
                      placeholder="blur"
                      blurDataURL={getBlurDataURL(siteContent.about.image.src)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
              )}

              {nextItem && nextData && (
                <Link
                  href={`${basePath}/${nextItem.slug}`}
                  className={`${styles.surface} group flex w-full min-w-0 items-center gap-4 overflow-hidden p-4 transition sm:p-5 hover:-translate-y-px hover:shadow-md hover:shadow-slate-200/70`}
                >
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white">
                    <LqipImage
                      src={nextData.thumbnail || nextData.heroImage}
                      alt={nextData.title}
                      width={360}
                      height={240}
                      placeholder="blur"
                      blurDataURL={getBlurDataURL(nextData.thumbnail || nextData.heroImage)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                      {siteContent.ui.nextProject}
                    </div>
                    <div className="mt-1 truncate text-base font-semibold text-slate-900 group-hover:text-(--accent-dark)">
                      {nextData.title}
                    </div>
                    {nextData.subtitle && (
                      <div className="mt-1 text-sm text-slate-600">
                        {nextData.subtitle}
                      </div>
                    )}
                  </div>
                  <div aria-hidden className="ml-auto text-slate-400">
                    →
                  </div>
                </Link>
              )}
            </div>
          </nav>
        )}
      </main>
    </div>
  );
}
