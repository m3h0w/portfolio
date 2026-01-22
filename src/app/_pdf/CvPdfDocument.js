import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Svg,
  Path,
} from "@react-pdf/renderer";

import { getLanguageSimpleIcon } from "@/lib/simpleIcons";
import {
  countryCodeToFlagEmoji,
  formatExperienceShort,
  splitTechIntoLanguagesAndOther,
} from "@/lib/tech";

const ACCENT = "#0f766e";

// React-PDF supports a subset of CSS. Avoid `gap` and rely on margins.
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.35,
    color: "#0f172a",
    backgroundColor: "#ffffff",
  },

  sidebar: {
    width: "33%",
    paddingTop: 28,
    paddingBottom: 28,
    paddingLeft: 24,
    paddingRight: 18,
    backgroundColor: "#f8fafc",
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    borderRightStyle: "solid",
  },
  main: {
    width: "67%",
    paddingTop: 28,
    paddingBottom: 28,
    paddingLeft: 22,
    paddingRight: 24,
  },

  name: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: -0.2,
  },
  headline: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: 600,
    color: ACCENT,
  },
  location: {
    marginTop: 6,
    fontSize: 9,
    color: "#475569",
  },

  section: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: "#0f172a",
  },
  sectionRule: {
    marginTop: 6,
    height: 1,
    backgroundColor: "#e2e8f0",
  },

  small: {
    fontSize: 9,
    color: "#334155",
  },
  muted: {
    color: "#475569",
  },
  link: {
    color: "#0f172a",
    textDecoration: "none",
  },

  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  iconRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  iconChip: {
    backgroundColor: "#ffffff",
    borderRadius: 999,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
  },
  pill: {
    backgroundColor: "#e2e8f0",
    borderRadius: 999,
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 9,
    color: "#0f172a",
    marginRight: 6,
    marginBottom: 6,
  },
  pillAccent: {
    backgroundColor: "#d1fae5",
    color: "#064e3b",
  },

  summary: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    borderTopStyle: "solid",
  },
  summaryText: {
    fontSize: 10,
    color: "#0f172a",
  },

  item: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eef2f7",
    borderTopStyle: "solid",
  },
  itemFirst: {
    marginTop: 8,
    paddingTop: 0,
    borderTopWidth: 0,
  },
  itemHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  companyName: {
    fontSize: 11,
    fontWeight: 700,
  },
  roleTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#0f172a",
  },
  metaRight: {
    fontSize: 9,
    color: "#475569",
  },
  metaLine: {
    marginTop: 2,
    fontSize: 9,
    color: "#475569",
  },

  bullets: {
    marginTop: 6,
  },
  bullet: {
    flexDirection: "row",
    marginTop: 2,
  },
  bulletDot: {
    width: 10,
    color: ACCENT,
    fontWeight: 700,
  },
  bulletText: {
    flex: 1,
    color: "#0f172a",
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 16,
    fontSize: 8,
    color: "#94a3b8",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  ratingRow: {
    flexDirection: "row",
    marginTop: 2,
  },
  ratingFace: {
    fontSize: 9,
    marginRight: 2,
  },
  ratingFaceEmpty: {
    color: "#cbd5e1",
  },
  ratingFaceFilled: {
    color: ACCENT,
  },

  subSectionTitle: {
    marginTop: 10,
    fontSize: 9,
    fontWeight: 700,
    color: "#0f172a",
  },
});

function t(locale) {
  const isPl = locale === "pl";
  return {
    summary: isPl ? "Podsumowanie" : "Summary",
    experience: isPl ? "Doświadczenie" : "Experience",
    projects: isPl ? "Projekty" : "Projects",
    education: isPl ? "Edukacja" : "Education",
    skills: isPl ? "Umiejętności" : "Skills",
    otherActivities: isPl ? "Inne aktywności" : "Other activities",
    volunteering: isPl ? "Wolontariat" : "Volunteering",
    languages: isPl ? "Języki" : "Languages",
    contact: isPl ? "Kontakt" : "Contact",
    links: isPl ? "Linki" : "Links",
    present: isPl ? "Obecnie" : "Present",
    updated: isPl ? "Aktualizacja" : "Updated",
  };
}

function formatYearMonth(ym, locale) {
  if (!ym) return "";
  const [y, m] = String(ym).split("-").map((v) => Number(v));
  const date = new Date(y, (m || 1) - 1, 1);
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(
    date
  );
}

function formatRange({ start, end }, locale, presentLabel) {
  const startText = start ? formatYearMonth(start, locale) : "";
  const endText = end ? formatYearMonth(end, locale) : presentLabel;
  if (!startText && !endText) return "";
  if (!startText) return endText;
  if (!endText) return startText;
  return `${startText} – ${endText}`;
}

function locationPrefix(locationMeta) {
  const mode = locationMeta?.mode;
  const countryCode = locationMeta?.countryCode;

  if (mode === "remote") return "🌐 ";
  if (mode === "remoteCompanyBased") {
    const flag = countryCodeToFlagEmoji(countryCode);
    return `${flag ? `${flag}` : ""}🌐 `;
  }

  const flag = countryCodeToFlagEmoji(countryCode);
  return flag ? `${flag} ` : "";
}

function inferMainLanguageFromTechList(tech) {
  const { languages } = splitTechIntoLanguagesAndOther(tech);
  return languages[0] || null;
}

function PdfLanguageIcon({ name, size = 12 }) {
  const icon = getLanguageSimpleIcon(name);
  if (!icon) return null;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={icon.path} fill={icon.hex} />
    </Svg>
  );
}

function RatingFaces({ value = 0, max = 5 }) {
  const safeValue = Math.max(0, Math.min(max, Number(value) || 0));
  return (
    <View style={styles.ratingRow}>
      {Array.from({ length: max }).map((_, idx) => {
        const filled = idx < safeValue;
        return (
          <Text
            key={idx}
            style={[
              styles.ratingFace,
              filled ? styles.ratingFaceFilled : styles.ratingFaceEmpty,
            ]}
          >
            ☺
          </Text>
        );
      })}
    </View>
  );
}

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <View style={styles.bullets}>
      {items.map((text) => (
        <View key={text} style={styles.bullet}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{text}</Text>
        </View>
      ))}
    </View>
  );
}

function Section({ title, children }) {
  if (!children) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
      {children}
    </View>
  );
}

function PillList({ items, variant = "default", limit }) {
  const list = (items || []).filter(Boolean);
  const finalItems = typeof limit === "number" ? list.slice(0, limit) : list;
  if (!finalItems.length) return null;

  const pillStyle =
    variant === "accent" ? [styles.pill, styles.pillAccent] : styles.pill;

  return (
    <View style={styles.pills}>
      {finalItems.map((x) => (
        <Text key={x} style={pillStyle}>
          {x}
        </Text>
      ))}
    </View>
  );
}

export default function CvPdfDocument({ cv, locale = "en" }) {
  const strings = t(locale);
  const presentLabel = strings.present;

  const contact = cv?.person?.contact;
  const links = contact?.links || [];
  const skillsHighlight = cv?.skills?.highlight || [];
  const languages = cv?.languages || [];
  const programmingLanguages = cv?.programmingLanguages?.items || [];
  const recentNonProfit = cv?.projects?.recentNonProfit || [];

  return (
    <Document title={`${cv.person.name} - CV`}>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Section title={strings.contact}>
            <View style={{ marginTop: 10 }}>
              {contact?.email ? (
                <Text style={styles.small}>
                  <Link style={styles.link} src={`mailto:${contact.email}`}>
                    {contact.email}
                  </Link>
                </Text>
              ) : null}
              {contact?.phone ? (
                <Text style={[styles.small, { marginTop: 4 }]}>
                  <Link
                    style={styles.link}
                    src={`tel:${String(contact.phone).replace(/\s+/g, "")}`}
                  >
                    {contact.phone}
                  </Link>
                </Text>
              ) : null}
            </View>
          </Section>

          {links?.length ? (
            <Section title={strings.links}>
              <View style={{ marginTop: 10 }}>
                {links.map((l) => (
                  <Text key={l.href} style={[styles.small, { marginTop: 4 }]}>
                    <Link style={styles.link} src={l.href}>
                      {l.label}
                    </Link>
                  </Text>
                ))}
              </View>
            </Section>
          ) : null}

          {skillsHighlight.length ? (
            <Section title={strings.skills}>
              <PillList items={skillsHighlight} limit={18} />
            </Section>
          ) : null}

          {programmingLanguages.length ? (
            <Section title={locale === "pl" ? "Języki programowania" : "Programming"}>
              <View style={{ marginTop: 10 }}>
                {programmingLanguages.slice(0, 6).map((pl) => {
                  const exp = formatExperienceShort(pl?.experience);
                  return (
                    <View key={pl.name} style={{ marginTop: 6 }}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={[styles.iconChip, { marginRight: 8, marginBottom: 0 }]}>
                          <PdfLanguageIcon name={pl.name} size={12} />
                        </View>
                        <Text style={styles.small}>
                          <Text style={{ fontWeight: 700 }}>{pl.name}</Text>
                          {exp ? <Text style={styles.muted}>{` (${exp})`}</Text> : null}
                        </Text>
                      </View>
                      <RatingFaces value={pl.enjoyment ?? 0} />
                    </View>
                  );
                })}
              </View>
            </Section>
          ) : null}

          {languages.length ? (
            <Section title={strings.languages}>
              <View style={{ marginTop: 10 }}>
                {languages.map((l) => (
                  <Text key={l.name} style={[styles.small, { marginTop: 4 }]}>
                    <Text style={{ fontWeight: 700 }}>{l.name}</Text>
                    <Text style={styles.muted}>{`  ·  ${l.proficiency}`}</Text>
                  </Text>
                ))}
              </View>
            </Section>
          ) : null}
        </View>

        {/* Main */}
        <View style={styles.main}>
          <Text style={styles.name}>{cv.person.name}</Text>
          <Text style={styles.headline}>{cv.person.headline}</Text>
          <Text style={styles.location}>
            {cv.person.location.city}, {cv.person.location.country}
          </Text>

          {cv.person.summary?.paragraphs?.length ? (
            <View style={styles.summary}>
              <Text style={styles.sectionTitle}>{strings.summary}</Text>
              <View style={styles.sectionRule} />
              <Text style={[styles.summaryText, { marginTop: 10 }]}>
                {cv.person.summary.paragraphs.join(" ")}
              </Text>
            </View>
          ) : null}

          {cv.experience?.length ? (
            <Section title={strings.experience}>
              <View style={{ marginTop: 8 }}>
                {cv.experience.map((company, idx) => (
                  <View
                    key={company.company.name}
                    style={idx === 0 ? styles.itemFirst : styles.item}
                  >
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.companyName}>{company.company.name}</Text>
                      {company.roles?.[0] ? (
                        <Text style={styles.metaRight}>
                          {formatRange(company.roles[0], locale, presentLabel)}
                        </Text>
                      ) : null}
                    </View>

                    {company.roles?.map((role) => (
                      <View
                        key={`${company.company.name}-${role.title}-${role.start}`}
                        style={{ marginTop: 8 }}
                        wrap={false}
                      >
                        <View style={styles.itemHeaderRow}>
                          <Text style={styles.roleTitle}>
                            {role.title}
                            {role.employmentType ? (
                              <Text style={styles.muted}>{`  ·  ${role.employmentType}`}</Text>
                            ) : null}
                          </Text>
                          <Text style={styles.metaRight}>
                            {formatRange(role, locale, presentLabel)}
                          </Text>
                        </View>
                        {role.location ? (
                          <Text style={styles.metaLine}>
                            {locationPrefix(role.locationMeta)}{role.location}
                          </Text>
                        ) : null}
                        <BulletList items={role.highlights} />
                        {role.tech?.length ? (() => {
                          const { languages: langs, other } = splitTechIntoLanguagesAndOther(role.tech);
                          return (
                            <>
                              {langs.length ? (
                                <View style={styles.iconRow}>
                                  {langs.map((l) => (
                                    <View key={l} style={styles.iconChip}>
                                      <PdfLanguageIcon name={l} size={12} />
                                    </View>
                                  ))}
                                </View>
                              ) : null}
                              {other.length ? (
                                <PillList items={other} limit={10} variant="accent" />
                              ) : null}
                            </>
                          );
                        })() : null}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </Section>
          ) : null}

          {recentNonProfit.length ? (
            <Section title={strings.projects}>
              <Text style={styles.subSectionTitle}>
                {locale === "pl" ? "Ostatnie projekty non-profit" : "Recent non-profit"}
              </Text>
              <View style={{ marginTop: 6 }}>
                {recentNonProfit.map((p, idx) => {
                  const mainLanguage = inferMainLanguageFromTechList(p.tech);
                  const { languages: langs, other } = splitTechIntoLanguagesAndOther(p.tech);

                  return (
                    <View key={p.name} style={idx === 0 ? styles.itemFirst : styles.item}>
                      <View style={styles.itemHeaderRow}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          {mainLanguage ? (
                            <View style={[styles.iconChip, { marginRight: 8, marginBottom: 0 }]}>
                              <PdfLanguageIcon name={mainLanguage} size={12} />
                            </View>
                          ) : null}
                          <Text style={styles.companyName}>{p.name}</Text>
                        </View>
                        {p.start ? (
                          <Text style={styles.metaRight}>
                            {formatRange(p, locale, presentLabel)}
                          </Text>
                        ) : null}
                      </View>

                      {p.location ? <Text style={styles.metaLine}>{p.location}</Text> : null}
                      <BulletList items={p.highlights} />

                      {p.tech?.length ? (
                        <>
                          {langs.length ? (
                            <View style={styles.iconRow}>
                              {langs.map((l) => (
                                <View key={l} style={styles.iconChip}>
                                  <PdfLanguageIcon name={l} size={12} />
                                </View>
                              ))}
                            </View>
                          ) : null}
                          {other.length ? <PillList items={other} limit={10} /> : null}
                        </>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            </Section>
          ) : null}

          {cv.education?.length ? (
            <Section title={strings.education}>
              <View style={{ marginTop: 8 }}>
                {cv.education.map((e, idx) => (
                  <View key={e.school} style={idx === 0 ? styles.itemFirst : styles.item}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.companyName}>{e.school}</Text>
                      <Text style={styles.metaRight}>
                        {e.startYear} – {e.endYear}
                      </Text>
                    </View>
                    <Text style={styles.metaLine}>
                      {e.degree} · {e.field}
                    </Text>
                    <Text style={styles.metaLine}>
                      {locationPrefix(e.locationMeta)}{e.location}
                    </Text>
                    <BulletList items={(e.achievements || []).slice(0, 3)} />
                    {e.technologies?.length ? (() => {
                      const { languages: langs, other } = splitTechIntoLanguagesAndOther(e.technologies);
                      return (
                        <>
                          {langs.length ? (
                            <View style={styles.iconRow}>
                              {langs.map((l) => (
                                <View key={l} style={styles.iconChip}>
                                  <PdfLanguageIcon name={l} size={12} />
                                </View>
                              ))}
                            </View>
                          ) : null}
                          {other.length ? (
                            <PillList items={other} limit={10} />
                          ) : null}
                        </>
                      );
                    })() : null}
                  </View>
                ))}
              </View>
            </Section>
          ) : null}

          {cv.otherActivities?.length ? (
            <Section title={strings.otherActivities}>
              <View style={{ marginTop: 8 }}>
                {cv.otherActivities.map((a, idx) => (
                  <View
                    key={a.organization.name}
                    style={idx === 0 ? styles.itemFirst : styles.item}
                  >
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.companyName}>{a.organization.name}</Text>
                      <Text style={styles.metaRight}>
                        {formatRange(a, locale, presentLabel)}
                      </Text>
                    </View>
                    <Text style={styles.metaLine}>{a.title}</Text>
                    <BulletList items={(a.highlights || []).slice(0, 2)} />
                  </View>
                ))}
              </View>
            </Section>
          ) : null}
        </View>

        <View style={styles.footer} fixed>
          <Text>
            {cv.person.name} · {locale === "pl" ? "CV" : "CV"}
          </Text>
          <Text>
            {strings.updated}: {cv.updatedAt}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
