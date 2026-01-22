import Link from "next/link";
import Image from "next/image";
import AbstractBackdrop from "@/components/AbstractBackdrop";
import HappyRating from "@/components/HappyRating";
import LanguageIcon from "@/components/LanguageIcon";
import LocationBadge from "@/components/LocationBadge";
import { getSiteContent } from "@/data/siteContent";
import { getCv } from "@/data/cv";
import portfolioItems from "@/data/portfolio";
import PrintButton from "@/app/_components/PrintButton";
import PdfPreviewModal from "@/app/_components/PdfPreviewModal";
import styles from "@/app/_components/LocalizedCvPage.module.css";
import {
  formatExperienceShort,
  inferMainLanguage,
  parseStackString,
  splitTechIntoLanguagesAndOther,
} from "@/lib/tech";

function formatYearMonth(ym, locale) {
  if (!ym) return null;
  const [y, m] = ym.split("-").map((v) => Number(v));
  const date = new Date(y, (m || 1) - 1, 1);
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(
    date
  );
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
    locale === "pl"
      ? `CV – ${siteContent.name}`
      : `CV – ${siteContent.name}`;

  const canonical = locale === "pl" ? "/pl/cv" : "/cv";

  return {
    title: `${siteContent.name} | ${title}`,
    description,
    alternates: { canonical },
  };
}

export default function LocalizedCvPage({ locale }) {
  const siteContent = getSiteContent(locale);
  const basePath = locale === "pl" ? "/pl" : "";
  const cv = getCv();

  const presentLabel = locale === "pl" ? "Obecnie" : "Present";
  const printLabel = locale === "pl" ? "Drukuj / Zapisz jako PDF" : "Print / Save as PDF";
  const previewPdfLabel = locale === "pl" ? "Podgląd PDF" : "Preview PDF";
  const openPdfLabel = locale === "pl" ? "Otwórz PDF" : "Open PDF";
  const closeLabel = locale === "pl" ? "Zamknij" : "Close";

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
              openLabel={previewPdfLabel}
              openInNewTabLabel={openPdfLabel}
              closeLabel={closeLabel}
              buttonClassName="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm backdrop-blur hover:bg-white"
            />

            <PrintButton
              label={printLabel}
              className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-(--accent-dark)"
            />
          </div>
        </div>

        <article className={`rounded-3xl ${styles.paper}`}>
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {/* Header */}
            <header className="border-b border-slate-900/10 pb-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {cv.person.name}
                  </h1>
                  <p className="mt-1 text-sm font-semibold text-(--accent) sm:text-base">
                    {cv.person.headline}
                  </p>
                  <p className={`mt-2 text-sm ${styles.muted}`}>
                    {cv.person.location.city}, {cv.person.location.country}
                  </p>
                </div>

                <div className="text-sm sm:text-right">
                  <div className="flex flex-col gap-1">
                    <a
                      href={`mailto:${cv.person.contact.email}`}
                      className="text-slate-800 hover:text-(--accent)"
                    >
                      {cv.person.contact.email}
                    </a>
                    {cv.person.contact.phone && (
                      <a
                        href={`tel:${cv.person.contact.phone.replace(/\s+/g, "")}`}
                        className="text-slate-800 hover:text-(--accent)"
                      >
                        {cv.person.contact.phone}
                      </a>
                    )}
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 sm:justify-end">
                      {cv.person.contact.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-700 hover:text-(--accent)"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-2 text-[15px] leading-7 text-slate-800">
                  {cv.person.summary.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-900/10">
                  <p
                    className={`text-xs font-semibold uppercase ${styles.smallCaps} text-slate-600`}
                  >
                    {locale === "pl" ? "Mocne strony" : "Strengths"}
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

                  <p
                    className={`mt-4 text-xs font-semibold uppercase ${styles.smallCaps} text-slate-600`}
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
            </header>

            {/* Experience */}
            <section className="mt-8">
              <h2 className={`text-xl font-bold text-slate-900 ${styles.sectionTitle}`}>
                {locale === "pl" ? "Doświadczenie" : "Experience"}
              </h2>

              <div className="mt-5 space-y-6">
                {experience.map((company) => (
                  <div key={company.company.name} className="rounded-2xl bg-white/60 p-5 ring-1 ring-slate-900/10">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          {company.company.logo?.src ? (
                            <Image
                              src={company.company.logo.src}
                              alt={company.company.logo.alt || company.company.name}
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
                        {company.tags?.length ? (
                          <p className="mt-1 text-xs text-slate-600">
                            {company.tags.join(" · ")}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      {company.roles.map((role) => (
                        <div key={`${company.company.name}-${role.title}-${role.start}`}> 
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                            <p className="text-sm font-semibold text-slate-900">
                              {role.title}
                              {role.employmentType ? (
                                <span className="text-slate-600 font-medium"> · {role.employmentType}</span>
                              ) : null}
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

                          {role.tech?.length ? (() => {
                            const { languages, other } = splitTechIntoLanguagesAndOther(role.tech);

                            return (
                              <>
                                {languages.length ? (
                                  <div className="mt-3 flex flex-wrap items-center gap-2">
                                    {languages.map((l) => (
                                      <span
                                        key={l}
                                        className="inline-flex items-center rounded-full bg-white/70 px-2 py-1 ring-1 ring-slate-900/10"
                                        title={l}
                                      >
                                        <LanguageIcon name={l} size={16} className="block" />
                                      </span>
                                    ))}
                                  </div>
                                ) : null}

                                {other.length ? (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {other.map((t) => (
                                      <span
                                        key={t}
                                        className="rounded-full bg-(--accent)/10 px-2.5 py-1 text-[11px] font-medium text-(--accent-dark)"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                ) : null}
                              </>
                            );
                          })() : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="mt-10">
              <h2 className={`text-xl font-bold text-slate-900 ${styles.sectionTitle}`}>
                {locale === "pl" ? "Projekty" : "Projects"}
              </h2>

              <div className="mt-5 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
                {portfolioItems.map((item) => {
                  const t = item.i18n?.[locale] ?? item.i18n?.en;
                  const href = `${basePath}/${item.slug}`;

                  const stack = item.stack || t?.stack || "";
                  const stackItems = parseStackString(stack);
                  const { other: otherStack } = splitTechIntoLanguagesAndOther(stackItems);
                  const mainLanguage = inferMainLanguage({
                    mainLanguage: item.mainLanguage,
                    stack,
                  });

                  return (
                    <Link
                      key={item.slug}
                      href={href}
                      className="group relative rounded-2xl bg-white/60 p-5 pb-12 ring-1 ring-slate-900/10 hover:ring-(--accent)/30"
                    >
                      {mainLanguage ? (
                        <span
                          className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm ring-1 ring-slate-900/10 backdrop-blur"
                          title={mainLanguage}
                        >
                          <LanguageIcon name={mainLanguage} size={18} className="block text-slate-700" />
                        </span>
                      ) : null}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-(--accent)">
                            <span className="inline-flex items-center gap-2">
                              <span>{t?.title ?? item.slug}</span>
                            </span>
                          </p>
                          {t?.subtitle ? (
                            <p className="mt-1 text-xs text-slate-600">{t.subtitle}</p>
                          ) : null}
                        </div>
                        {item.work?.entity ? (
                          <span className="shrink-0 rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] font-medium text-slate-700">
                            {item.work.entity}
                          </span>
                        ) : null}
                      </div>
                      {t?.description ? (
                        <p className="mt-3 text-sm text-slate-800 leading-6">{t.description}</p>
                      ) : null}
                      {stack ? (
                        <p className="mt-3 text-xs text-slate-600">
                          <span className="font-semibold">Stack:</span>{" "}
                          {otherStack.length ? otherStack.join(", ") : stack}
                        </p>
                      ) : null}
                    </Link>
                  );
                })}
              </div>

              {cv.projects?.recentNonProfit?.length ? (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {locale === "pl" ? "Ostatnie projekty non-profit" : "Recent non-profit"}
                  </h3>
                  <div className="mt-3 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
                    {cv.projects.recentNonProfit.map((p) => {
                      const { languages: pLanguages, other: pOther } = splitTechIntoLanguagesAndOther(
                        p.tech || []
                      );
                      const pMainLanguage = pLanguages[0] || null;

                      return (
                      <div
                        key={p.name}
                        className="relative rounded-2xl bg-white/60 p-5 pb-12 ring-1 ring-slate-900/10"
                      >
                        {pMainLanguage ? (
                          <span
                            className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm ring-1 ring-slate-900/10 backdrop-blur"
                            title={pMainLanguage}
                          >
                            <LanguageIcon name={pMainLanguage} size={18} className="block text-slate-700" />
                          </span>
                        ) : null}
                        <p className="text-sm font-semibold text-slate-900">{p.name}</p>
                        <p className="mt-1 text-xs text-slate-600">
                          {p.location}
                          {p.start ? (
                            <span>
                              {" "}· {formatRange(p, locale, presentLabel)}
                            </span>
                          ) : null}
                        </p>
                        {p.highlights?.length ? (
                          <ul className="mt-2 space-y-1 text-sm text-slate-800 list-disc pl-5">
                            {p.highlights.map((h) => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                        ) : null}
                        {p.tech?.length ? (
                          <p className="mt-3 text-xs text-slate-600">
                            <span className="font-semibold">Tech:</span>{" "}
                            {pOther.length ? pOther.join(", ") : p.tech.join(", ")}
                          </p>
                        ) : null}
                      </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </section>

            {/* Other activities */}
            {cv.otherActivities?.length ? (
              <section className="mt-10">
                <h2 className={`text-xl font-bold text-slate-900 ${styles.sectionTitle}`}>
                  {locale === "pl" ? "Inne aktywności" : "Other activities"}
                </h2>

                <div className="mt-5 space-y-4">
                  {cv.otherActivities.map((a) => (
                    <div
                      key={`${a.organization.name}-${a.title}-${a.start}`}
                      className="rounded-2xl bg-white/60 p-5 ring-1 ring-slate-900/10"
                    >
                      <div className="flex items-start gap-3">
                        {a.organization.logo?.src ? (
                          <Image
                            src={a.organization.logo.src}
                            alt={a.organization.logo.alt || a.organization.name}
                            width={28}
                            height={28}
                            className="mt-0.5 h-7 w-7 rounded-lg ring-1 ring-slate-900/10"
                          />
                        ) : null}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                            <p className="text-sm font-semibold text-slate-900">
                              {a.organization.website ? (
                                <a
                                  href={a.organization.website}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="hover:text-(--accent)"
                                >
                                  {a.organization.name}
                                </a>
                              ) : (
                                a.organization.name
                              )}
                              <span className="text-slate-600 font-medium"> · {a.title}</span>
                            </p>
                            <p className="text-xs text-slate-600">
                              {formatRange(a, locale, presentLabel)}
                            </p>
                          </div>

                          {a.location ? (
                            <p className="text-xs text-slate-600">{a.location}</p>
                          ) : null}

                          {a.highlights?.length ? (
                            <ul className="mt-2 space-y-1 text-sm text-slate-800 list-disc pl-5">
                              {a.highlights.map((h) => (
                                <li key={h}>{h}</li>
                              ))}
                            </ul>
                          ) : null}

                          {a.skills?.length ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {a.skills.map((s) => (
                                <span
                                  key={s}
                                  className="rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Programming languages */}
            <section className="mt-10">
              <h2 className={`text-xl font-bold text-slate-900 ${styles.sectionTitle}`}>
                {locale === "pl" ? "Języki programowania" : "Programming languages"}
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
                          <LanguageIcon name={lang.name} size={18} className="block" />
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
              <p className="mt-3 text-xs text-slate-600">
                {locale === "pl"
                  ? "Wartości pochodzą z CV (self-reported)."
                  : "Values are self-reported from the CV."}
              </p>
            </section>

            {/* Education */}
            <section className="mt-10">
              <h2 className={`text-xl font-bold text-slate-900 ${styles.sectionTitle}`}>
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
                    {e.technologies?.length ? (() => {
                      const { languages, other } = splitTechIntoLanguagesAndOther(e.technologies);
                      return (
                        <div className="mt-3">
                          {languages.length ? (
                            <div className="flex flex-wrap items-center gap-2">
                              {languages.map((l) => (
                                <span
                                  key={l}
                                  className="inline-flex items-center rounded-full bg-white/70 px-2 py-1 ring-1 ring-slate-900/10"
                                  title={l}
                                >
                                  <LanguageIcon name={l} size={16} className="block" />
                                </span>
                              ))}
                            </div>
                          ) : null}

                          {other.length ? (
                            <p className="mt-2 text-xs text-slate-600">
                              <span className="font-semibold">Tech:</span> {other.join(", ")}
                            </p>
                          ) : null}
                        </div>
                      );
                    })() : null}
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-10 border-t border-slate-900/10 pt-6 text-xs text-slate-600">
              <p>
                {locale === "pl"
                  ? "Wersja online CV. Użyj drukowania przeglądarki, aby zapisać jako PDF."
                  : "Online CV. Use your browser print dialog to save as PDF."}
              </p>
            </footer>
          </div>
        </article>
      </main>
    </div>
  );
}
