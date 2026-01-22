import Link from "next/link";
import Image from "next/image";
import AbstractBackdrop from "@/components/AbstractBackdrop";
import HappyRating from "@/components/HappyRating";
import GlassesIcon from "@/components/GlassesIcon";
import LanguageIcon from "@/components/LanguageIcon";
import LocationBadge from "@/components/LocationBadge";
import { getSiteContent } from "@/data/siteContent";
import { getCv } from "@/data/cv";
import portfolioItems from "@/data/portfolio";
import PdfPreviewModal from "@/app/_components/PdfPreviewModal";
import LivePreviewModal from "@/app/_components/LivePreviewModal";
import EmailRevealButton from "@/app/_components/EmailRevealButton";
import styles from "@/app/_components/LocalizedCvPage.module.css";
import {
  formatExperienceShort,
  inferMainLanguage,
  parseStackString,
  splitTechIntoLanguagesAndOther,
} from "@/lib/tech";
import { getLivePreviewLink } from "@/app/_components/livePreviewUtils";

function formatYearMonth(ym, locale) {
  if (!ym) return null;
  const [y, m] = ym.split("-").map((v) => Number(v));
  const date = new Date(y, (m || 1) - 1, 1);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatRange({ start, end }, locale, presentLabel) {
  const startText = formatYearMonth(start, locale);
  const endText = end ? formatYearMonth(end, locale) : presentLabel;
  if (!startText && !endText) return "";
  if (!startText) return endText;
  if (!endText) return startText;
  return `${startText} – ${endText}`;
}

function sortByMostRecentRole(a, b) {
  const aLatest = a?.roles?.[0]?.start || "0000-00";
  const bLatest = b?.roles?.[0]?.start || "0000-00";
  return aLatest < bLatest ? 1 : -1;
}

export function getCvMetadata(locale) {
  const siteContent = getSiteContent(locale);
  const title = locale === "pl" ? "CV" : "CV";
  const description =
    locale === "pl" ? `CV – ${siteContent.name}` : `CV – ${siteContent.name}`;

  const canonical = locale === "pl" ? "/pl/cv" : "/cv";

  return {
    title: `${siteContent.name} | ${title}`,
    description,
    alternates: {
      canonical,
      languages: {
        en: "/cv",
        pl: "/pl/cv",
        "x-default": "/cv",
      },
    },
  };
}

export default function LocalizedCvPage({ locale }) {
  const siteContent = getSiteContent(locale);
  const basePath = locale === "pl" ? "/pl" : "";
  const cv = getCv();

  const presentLabel = locale === "pl" ? "Obecnie" : "Present";
  const openPdfLabel = locale === "pl" ? "Otwórz PDF" : "Open PDF";
  const previewProjectLabel =
    locale === "pl" ? "Podgląd projektu" : "Preview project";
  const openProjectLabel = locale === "pl" ? "Otwórz projekt" : "Open project";
  const closeLabel = locale === "pl" ? "Zamknij" : "Close";
  const emailLabel = "Reveal Email";

  const experience = [...cv.experience].sort(sortByMostRecentRole);

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="print-hidden">
        <AbstractBackdrop variant="me" />
      </div>

      <main className="relative mx-auto w-full max-w-5xl flex-1 px-6 pt-10 pb-14 sm:px-8 sm:pt-12 sm:pb-16">
        <div className="print-hidden mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`${basePath}/`}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur hover:bg-white"
          >
            <span aria-hidden>←</span>
            {siteContent.ui.backToPortfolio}
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <PdfPreviewModal
              url={`/api/cv-pdf?lang=${locale === "pl" ? "pl" : "en"}&inline=1`}
              title={locale === "pl" ? "CV (PDF)" : "CV (PDF)"}
              openLabel={openPdfLabel}
              openInNewTabLabel={openPdfLabel}
              closeLabel={closeLabel}
              openIcon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M9 13h6" />
                  <path d="M9 17h6" />
                </svg>
              }
              rightIcon={
                <GlassesIcon
                  size={16}
                  className="brightness-0 invert opacity-95"
                />
              }
              cursorVariant="white"
              buttonClassName="inline-flex items-center gap-2 rounded-full bg-(--accent) px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-(--accent-dark)"
            />
          </div>
        </div>

        <article className={`rounded-3xl ${styles.paper}`}>
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {/* Header */}
            <header className="border-b border-slate-900/10 pb-8">
              <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-slate-900/10">
                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="flex flex-col items-center space-y-3 text-center">
                    <Image
                      src="/images/me2.jpg"
                      alt={cv.person.name}
                      width={120}
                      height={120}
                      className="rounded-full ring-4 ring-slate-900/5"
                    />

                    <div className="space-y-0">
                      <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        {cv.person.name}
                      </h1>

                      <p className="text-base font-semibold text-(--accent) sm:text-lg">
                        {cv.person.headline}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
                      <EmailRevealButton
                        label={emailLabel}
                        className={styles.emailPill}
                        copiedLabel={locale === "pl" ? "Skopiowano" : "Copied"}
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {cv.person.contact.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10 hover:bg-slate-900/10 hover:text-slate-900"
                        >
                          {link.kind === "github" && (
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          )}
                          {link.kind === "linkedin" && (
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          )}
                          {link.kind === "website" && (
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v-3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z" />
                            </svg>
                          )}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-0 lg:pl-10 lg:pr-4 text-[15px] leading-6 text-slate-800 lg:border-l lg:border-slate-900/10 text-balance">
                    {cv.person.summary.paragraphs.map((p, i) => (
                      <p key={p} className={i > 0 ? "mt-3" : ""}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white/70 p-4 ring-1 ring-slate-900/10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p
                      className={`text-xs font-semibold uppercase ${styles.smallCaps} text-slate-600`}
                    >
                      {locale === "pl" ? "Mocne" : "Strong"}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cv.skills.highlight.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-slate-900/5 px-2.5 py-1 text-xs font-medium text-slate-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p
                      className={`text-xs font-semibold uppercase ${styles.smallCaps} text-slate-600`}
                    >
                      {locale === "pl" ? "Doświadczenie" : "Experienced"}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cv.skills.experienced.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-slate-900/5 px-2.5 py-1 text-xs font-medium text-slate-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Experience */}
            <section className="mt-8">
              <h2
                className={`text-xl font-bold text-slate-900 ${styles.sectionTitle}`}
              >
                {locale === "pl" ? "Doświadczenie" : "Experience"}
              </h2>

              <div className="mt-5 space-y-6">
                {experience.map((company) => (
                  <div
                    key={company.company.name}
                    className="rounded-2xl bg-white/60 p-5 ring-1 ring-slate-900/10"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          {company.company.logo?.src ? (
                            <Image
                              src={company.company.logo.src}
                              alt={
                                company.company.logo.alt || company.company.name
                              }
                              width={28}
                              height={28}
                              className="h-7 w-7 rounded-lg ring-1 ring-slate-900/10"
                            />
                          ) : (
                            <div className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900/5 text-[11px] font-bold text-slate-700 ring-1 ring-slate-900/10">
                              {company.company.name
                                .split(/\s+/)
                                .slice(0, 2)
                                .map((w) => w[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                          )}

                          <h3 className="text-base font-semibold text-slate-900">
                            {company.company.website ? (
                              <a
                                href={company.company.website}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-(--accent)"
                              >
                                {company.company.name}
                              </a>
                            ) : (
                              company.company.name
                            )}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      {company.roles.map((role, roleIndex) => (
                        <div
                          key={`${company.company.name}-${role.title}-${role.start}`}
                          className={roleIndex > 0 ? "mt-8" : undefined}
                        >
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                            <p className="text-sm font-semibold text-slate-900">
                              {role.title}
                            </p>
                            <p className="text-xs text-slate-600">
                              {formatRange(role, locale, presentLabel)}
                            </p>
                          </div>

                          {role.location ? (
                            <p className="text-xs text-slate-600">
                              <LocationBadge meta={role.locationMeta}>
                                {role.location}
                              </LocationBadge>
                            </p>
                          ) : null}

                          {role.highlights?.length ? (
                            <ul className="mt-2 space-y-1 text-sm text-slate-800 list-disc pl-5">
                              {role.highlights.map((h) => (
                                <li key={h}>{h}</li>
                              ))}
                            </ul>
                          ) : null}

                          {role.tech?.length
                            ? (() => {
                                const { languages, other } =
                                  splitTechIntoLanguagesAndOther(role.tech);

                                return (
                                  <div className="mt-4 flex flex-wrap items-center gap-2">
                                    {languages.map((l) => (
                                      <span
                                        key={l}
                                        className="inline-flex items-center justify-center rounded-full bg-slate-900/5 p-0.5 ring-1 ring-slate-900/10"
                                        title={l}
                                      >
                                        <LanguageIcon
                                          name={l}
                                          size={14}
                                          className="block text-slate-500"
                                        />
                                      </span>
                                    ))}
                                    {other.map((t) => (
                                      <span
                                        key={t}
                                        className="rounded-full bg-slate-900/5 px-2 py-0.5 text-[10px] font-medium text-slate-700 ring-1 ring-slate-900/10"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                );
                              })()
                            : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Other activities */}
            {null}

            {/* Programming languages */}
            <section className="mt-10">
              <h2
                className={`text-xl font-bold text-slate-900 ${styles.sectionTitle}`}
              >
                {locale === "pl"
                  ? "Języki programowania"
                  : "Programming languages"}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {cv.programmingLanguages.items.map((lang) => {
                  const expShort = formatExperienceShort(lang.experience);

                  return (
                    <div
                      key={lang.name}
                      className="flex items-center justify-between rounded-xl bg-white/60 px-4 py-3 ring-1 ring-slate-900/10"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className="inline-flex items-center rounded-full bg-white/70 p-1 ring-1 ring-slate-900/10"
                          title={lang.name}
                        >
                          <LanguageIcon
                            name={lang.name}
                            size={18}
                            className="block"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-slate-900">
                            {lang.name}{" "}
                            {expShort ? (
                              <span className="text-xs font-medium text-slate-600">
                                ({expShort})
                              </span>
                            ) : null}
                          </span>
                        </span>
                      </span>

                      <HappyRating value={lang.enjoyment ?? 0} />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Education */}
            <section className="mt-10">
              <h2
                className={`text-xl font-bold text-slate-900 ${styles.sectionTitle}`}
              >
                {locale === "pl" ? "Edukacja" : "Education"}
              </h2>
              <div className="mt-5 space-y-4">
                {cv.education.map((e) => (
                  <div
                    key={`${e.school}-${e.degree}-${e.field}`}
                    className="rounded-2xl bg-white/60 p-5 ring-1 ring-slate-900/10"
                  >
                    <div className="flex items-start gap-3">
                      {e.logo?.src ? (
                        <Image
                          src={e.logo.src}
                          alt={e.logo.alt || e.school}
                          width={28}
                          height={28}
                          className="mt-0.5 h-7 w-7 rounded-lg ring-1 ring-slate-900/10"
                        />
                      ) : null}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <p className="text-sm font-semibold text-slate-900">
                            {e.school}
                          </p>
                          <p className="text-xs text-slate-600">
                            {e.startYear} – {e.endYear}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-slate-800">
                          {e.degree}: {e.field}
                        </p>

                        {e.location ? (
                          <p className="mt-1 text-xs text-slate-600">
                            <LocationBadge meta={e.locationMeta}>
                              {e.location}
                            </LocationBadge>
                          </p>
                        ) : null}
                      </div>
                    </div>
                    {e.achievements?.length ? (
                      <ul className="mt-3 space-y-1 text-sm text-slate-800 list-disc pl-5">
                        {e.achievements.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    ) : null}
                    {e.technologies?.length
                      ? (() => {
                          const { languages, other } =
                            splitTechIntoLanguagesAndOther(e.technologies);
                          return (
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              {languages.map((l) => (
                                <span
                                  key={l}
                                  className="inline-flex items-center justify-center rounded-full bg-slate-900/5 p-1.5 ring-1 ring-slate-900/10"
                                  title={l}
                                >
                                  <LanguageIcon
                                    name={l}
                                    size={18}
                                    className="block"
                                  />
                                </span>
                              ))}
                              {other.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-900/10"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          );
                        })()
                      : null}
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="mt-10">
              <h2
                className={`text-xl font-bold text-slate-900 ${styles.sectionTitle}`}
              >
                {locale === "pl" ? "Projekty" : "Projects"}
              </h2>

              <div className="mt-5 grid gap-4 grid-cols-1 sm:[grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                {portfolioItems.map((item) => {
                  const t = item.i18n?.[locale] ?? item.i18n?.en;
                  const href = `${basePath}/${item.slug}`;

                  const stack = item.stack || t?.stack || "";
                  const stackItems = parseStackString(stack);
                  const { other: otherStack } =
                    splitTechIntoLanguagesAndOther(stackItems);
                  const mainLanguage = inferMainLanguage({
                    mainLanguage: item.mainLanguage,
                    stack,
                  });

                  const title = t?.title ?? item.slug;
                  const titleLower = String(title || "").toLowerCase();
                  const entityName = item.work?.entity || "";
                  const entityLower = String(entityName || "").toLowerCase();
                  const communityEntities = ["lighthouse cph", "traivel"];
                  const personalEntities = [
                    "talkling",
                    "warsaw institute of relating",
                  ];
                  const researchCategories = item.categories || [];
                  const isResearch = researchCategories.some(
                    (cat) =>
                      cat.toLowerCase().includes("research") ||
                      cat.toLowerCase().includes("science"),
                  );

                  let badgeLabel = null;
                  let badgeType = null;

                  if (communityEntities.includes(entityLower)) {
                    badgeLabel = "Community Project";
                    badgeType = "community";
                  } else if (personalEntities.includes(entityLower)) {
                    badgeLabel = "Personal Project";
                    badgeType = "personal";
                  } else if (entityLower && entityLower !== titleLower) {
                    badgeLabel = entityName;
                    badgeType = isResearch ? "research" : "professional";
                  } else if (entityLower) {
                    badgeLabel = null;
                    badgeType = null;
                  } else {
                    badgeLabel = "Personal Project";
                    badgeType = "personal";
                  }

                  const previewUrl = `${href}?sidebar=false`;

                  return (
                    <LivePreviewModal
                      key={item.slug}
                      url={previewUrl}
                      title={title}
                      openLabel={previewProjectLabel}
                      openAriaLabel={previewProjectLabel}
                      openInNewTabLabel={openProjectLabel}
                      closeLabel={closeLabel}
                      buttonClassName="group relative w-full text-left rounded-2xl bg-white/60 p-5 pb-12 ring-1 ring-slate-900/10 hover:ring-(--accent)/30 flex flex-col items-start justify-start"
                      trigger={
                        <>
                          {mainLanguage ? (
                            <span
                              className="absolute bottom-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/5 p-1 ring-1 ring-slate-900/10"
                              title={mainLanguage}
                            >
                              <LanguageIcon
                                name={mainLanguage}
                                size={22}
                                className="block text-slate-500"
                              />
                            </span>
                          ) : null}
                          <div>
                            {badgeLabel ? (
                              <span className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-slate-100/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-900/5">
                                {badgeType === "personal" && (
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3 w-3"
                                  >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                  </svg>
                                )}
                                {badgeType === "community" && (
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3 w-3"
                                  >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                  </svg>
                                )}
                                {badgeType === "professional" && (
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3 w-3"
                                  >
                                    <rect
                                      x="2"
                                      y="7"
                                      width="20"
                                      height="14"
                                      rx="2"
                                      ry="2"
                                    />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                  </svg>
                                )}
                                {badgeType === "research" && (
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3 w-3"
                                  >
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                  </svg>
                                )}
                                {badgeLabel}
                              </span>
                            ) : null}
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-(--accent)">
                              <span className="inline-flex items-center gap-2">
                                <span>{title}</span>
                              </span>
                            </p>
                          </div>
                          {t?.description ? (
                            <p className="mt-3 text-sm text-slate-800 leading-6">
                              {t.description}
                            </p>
                          ) : null}
                          {otherStack.length ? (
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              {otherStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-900/10"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </>
                      }
                    />
                  );
                })}
              </div>

              {null}
            </section>

            {/* Footer */}
            {null}
          </div>
        </article>
      </main>
    </div>
  );
}
