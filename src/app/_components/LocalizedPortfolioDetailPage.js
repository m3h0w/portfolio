import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AbstractBackdrop from "@/components/AbstractBackdrop";
import portfolioItems from "@/data/portfolio";
import { getSiteContent } from "@/data/siteContent";
import styles from "@/app/portfolio/[slug]/page.module.css";
import LivePreviewModal from "@/app/_components/LivePreviewModal";
import AtAGlanceLinks from "@/app/_components/AtAGlanceLinks";
import AtAGlanceBackToPortfolio from "@/app/_components/AtAGlanceBackToPortfolio";
import {
  getLivePreviewLink,
  isIframeLivePreviewAllowed,
  isLivePreviewLink,
} from "@/app/_components/livePreviewUtils";

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
      return (
        <figure className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-md shadow-slate-200/60">
            <Image
              src={block.src}
              alt={block.alt}
              width={1200}
              height={800}
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`${basePath}/#portfolio`}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur hover:bg-white"
          >
            <span aria-hidden>←</span>
            {siteContent.ui.backToPortfolio}
          </Link>

          <div id={topActionsId} className="flex flex-wrap items-center gap-2">
            {liveLink && iframeAllowed && (
              <LivePreviewModal
                url={liveLink.href}
                title={data.title}
                openLabel={siteContent.ui.livePreview}
                openInNewTabLabel={siteContent.ui.openInNewTab}
                closeLabel={siteContent.ui.close}
              />
            )}

            {liveLink && !iframeAllowed && (
              <a
                href={liveLink.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-(--accent-dark)"
              >
                {siteContent.ui.openInNewTab}
                <span aria-hidden>↗</span>
              </a>
            )}

            {data.links && data.links.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {data.links.map((link) => {
                  const allowInlinePreview =
                    isLivePreviewLink(link) &&
                    isIframeLivePreviewAllowed({ slug: item.slug, href: link.href });

                  if (allowInlinePreview) {
                    return (
                      <LivePreviewModal
                        key={`preview-${link.label}`}
                        url={link.href}
                        title={`${data.title} — ${link.label}`}
                        openLabel={link.label}
                        openInNewTabLabel={siteContent.ui.openInNewTab}
                        closeLabel={siteContent.ui.close}
                        buttonClassName="inline-flex cursor-pointer items-center gap-2 rounded-full bg-(--accent) px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-(--accent-dark)"
                      />
                    );
                  }

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-(--accent-dark)"
                    >
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
              <Image
                src={data.heroImage}
                alt={data.title}
                width={1600}
                height={1000}
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

            <section className="project-content mt-8">
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
                <h2 className="text-sm font-semibold tracking-wide text-slate-900">
                  {siteContent.ui.atAGlance}
                </h2>

                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  {data.subtitle && (
                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-500">
                        {siteContent.ui.type}
                      </div>
                      <div className="mt-1">{data.subtitle}</div>
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
                href={`${basePath}/#portfolio`}
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
                  href={`${basePath}/portfolio/${prevItem.slug}`}
                  className={`${styles.surface} group flex items-center gap-4 p-4 transition sm:p-5 hover:-translate-y-px hover:shadow-md hover:shadow-slate-200/70`}
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
                    <Image
                      src={prevData.thumbnail || prevData.heroImage}
                      alt={prevData.title}
                      width={360}
                      height={240}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
              ) : (
                <Link
                  href={`${basePath}/me`}
                  className={`${styles.surface} group flex items-center gap-4 p-4 transition sm:p-5 hover:-translate-y-px hover:shadow-md hover:shadow-slate-200/70`}
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
                    <Image
                      src={siteContent.about.image.src}
                      alt={siteContent.about.image.alt}
                      width={360}
                      height={240}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
              )}

              {nextItem && nextData && (
                <Link
                  href={`${basePath}/portfolio/${nextItem.slug}`}
                  className={`${styles.surface} group flex items-center gap-4 p-4 transition sm:p-5 hover:-translate-y-px hover:shadow-md hover:shadow-slate-200/70`}
                >
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white">
                    <Image
                      src={nextData.thumbnail || nextData.heroImage}
                      alt={nextData.title}
                      width={360}
                      height={240}
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
