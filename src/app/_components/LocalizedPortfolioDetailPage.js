import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AbstractBackdrop from "@/components/AbstractBackdrop";
import portfolioItems from "@/data/portfolio";
import { getSiteContent } from "@/data/siteContent";
import styles from "@/app/portfolio/[slug]/page.module.css";
import LivePreviewModal from "@/app/_components/LivePreviewModal";
import AtAGlanceLinks from "@/app/_components/AtAGlanceLinks";

const isLivePreviewLink = (link) => {
  const label = (link?.label || "").toLowerCase();
  if (!link?.href) return false;

  return (
    label.includes("live") ||
    label.includes("website") ||
    label.includes("strona") ||
    label.includes("site")
  );
};

const getEmbeddablePreviewUrl = (href) => {
  if (!href) return null;

  try {
    const url = new URL(href);
    const host = url.hostname;

    if (host.endsWith("drive.google.com")) {
      // Common format: https://drive.google.com/file/d/<id>/view?...
      if (url.pathname.includes("/file/d/") && url.pathname.includes("/view")) {
        return href.replace("/view", "/preview");
      }

      // Sometimes: https://drive.google.com/open?id=<id>
      const id = url.searchParams.get("id");
      if (id) {
        return `https://drive.google.com/file/d/${id}/preview`;
      }

      return null;
    }

    if (host.endsWith("docs.google.com")) {
      // Docs/Slides/Sheets often embed via /preview.
      if (url.pathname.endsWith("/preview")) return href;
      if (url.pathname.endsWith("/edit")) return href.replace(/\/edit$/, "/preview");
      if (url.pathname.endsWith("/view")) return href.replace(/\/view$/, "/preview");

      // If there's no explicit /edit or /view, leave as-is (often still works).
      return href;
    }

    return null;
  } catch {
    return null;
  }
};

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

  const livePreviewUrl = (data.links || []).find(isLivePreviewLink)?.href;
  const topActionsId = "portfolio-detail-top-actions";

  const stackItems = (data.stack || "")
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
            {livePreviewUrl && (
              <LivePreviewModal
                url={livePreviewUrl}
                title={data.title}
                openLabel={siteContent.ui.livePreview}
                openInNewTabLabel={siteContent.ui.openInNewTab}
                closeLabel={siteContent.ui.close}
              />
            )}

            {data.links && data.links.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {data.links.map((link) => {
                  const previewUrl = getEmbeddablePreviewUrl(link.href);
                  if (previewUrl) {
                    return (
                      <LivePreviewModal
                        key={`preview-${link.label}`}
                        url={previewUrl}
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
          <article className={`${styles.surface} p-5 sm:p-7`}>
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
            <div className={`${styles.surface} p-5 sm:p-6`}>
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

                {data.stack && (
                  <div>
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                      {siteContent.ui.stack}
                    </div>
                    <div className={`mt-1 ${styles.kbd}`}>{data.stack}</div>
                  </div>
                )}

                <AtAGlanceLinks
                  observeId={topActionsId}
                  links={data.links}
                  projectTitle={data.title}
                  headingLabel={siteContent.ui.links}
                  openInNewTabLabel={siteContent.ui.openInNewTab}
                  closeLabel={siteContent.ui.close}
                />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
