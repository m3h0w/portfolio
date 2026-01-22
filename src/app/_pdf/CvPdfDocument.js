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
  Image,
  Font,
} from "@react-pdf/renderer";
import path from "path";

import { getLanguageSimpleIcon } from "@/lib/simpleIcons";
import {
  countryCodeToFlagEmoji,
  formatExperienceShort,
  splitTechIntoLanguagesAndOther,
} from "@/lib/tech";

const ACCENT = "#4b1fe6";
const PAGE_TOP_PAD = 24;
const FONT_FAMILY = "Roboto";
const PROFILE_PHOTO_PATH = path.join(process.cwd(), "public/images/me2.jpg");
const PUBLIC_DIR = path.join(process.cwd(), "public");

Font.register({
  family: FONT_FAMILY,
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf",
      fontWeight: 700,
    },
  ],
});

// React-PDF supports a subset of CSS. Avoid `gap` and rely on margins.
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: FONT_FAMILY,
    fontSize: 10,
    lineHeight: 1.35,
    color: "#0f172a",
    backgroundColor: "#ffffff",
    paddingTop: PAGE_TOP_PAD,
    paddingBottom: 0,
  },

  sidebar: {
    width: "33%",
    paddingTop: 0,
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
    paddingTop: 0,
    paddingBottom: 28,
    paddingLeft: 22,
    paddingRight: 24,
  },
  topPadRow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: PAGE_TOP_PAD,
    flexDirection: "row",
  },
  topPadSidebar: {
    width: "33%",
    backgroundColor: "#f8fafc",
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    borderRightStyle: "solid",
  },
  topPadMain: {
    width: "67%",
    backgroundColor: "#ffffff",
  },

  identityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  identityText: {
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: -0.2,
  },
  headline: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: 600,
    color: ACCENT,
  },
  location: {
    marginTop: 4,
    fontSize: 9,
    color: "#475569",
  },

  section: {
    marginTop: 18,
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
  linkText: {
    fontSize: 8,
    color: "#475569",
  },

  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  iconRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  iconChip: {
    backgroundColor: "#f8fafc",
    borderRadius: 999,
    paddingVertical: 1,
    paddingHorizontal: 3,
    marginRight: 3,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
  },
  pill: {
    backgroundColor: "#f1f5f9",
    borderRadius: 999,
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontSize: 7,
    lineHeight: 1.2,
    color: "#475569",
    marginRight: 3,
    marginBottom: 3,
  },
  pillAccent: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
  },

  summary: {
    marginTop: 8,
  },
  summaryText: {
    fontSize: 8,
    color: "#0f172a",
  },

  item: {
    marginTop: 10,
    paddingTop: 8,
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
    alignItems: "flex-start",
  },
  companyName: {
    fontSize: 11,
    fontWeight: 700,
  },
  companyHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  companyText: {
    flexDirection: "column",
  },
  roleTitleInline: {
    marginTop: 2,
    fontSize: 9,
    fontWeight: 600,
    color: "#475569",
  },
  companyLogo: {
    width: 14,
    height: 14,
    marginRight: 6,
    borderRadius: 3,
  },
  roleTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: "#1f2937",
    lineHeight: 1.25,
  },
  metaRight: {
    fontSize: 7,
    color: "#94a3b8",
  },
  metaRightSmall: {
    fontSize: 6.8,
    color: "#64748b",
    marginBottom: -1,
  },
  metaLine: {
    marginTop: 4,
    fontSize: 9,
    lineHeight: 1.3,
    color: "#475569",
  },

  bullets: {
    marginTop: 5,
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
    fontSize: 7,
    lineHeight: 1.4,
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
  skillLabel: {
    marginTop: 6,
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: "#475569",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  linkIcon: {
    marginRight: 6,
  },
  techRow: {
    marginTop: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
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

  if (mode === "remote") return "Remote · ";
  if (mode === "remoteCompanyBased") return "Remote · ";

  return "";
}

function inferMainLanguageFromTechList(tech) {
  const { languages } = splitTechIntoLanguagesAndOther(tech);
  return languages[0] || null;
}

function PdfLanguageIcon({ name, size = 10 }) {
  const icon = getLanguageSimpleIcon(name);
  if (!icon) return null;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={icon.path} fill="#64748b" />
    </Svg>
  );
}

function TechBadges({ languages = [], other = [] }) {
  if (!languages.length && !other.length) return null;

  return (
    <View style={styles.techRow}>
      {languages.map((lang) => (
        <View key={`lang-${lang}`} style={styles.iconChip}>
          <PdfLanguageIcon name={lang} size={9} />
        </View>
      ))}
      {other.map((tech) => (
        <Text key={`tech-${tech}`} style={styles.pill}>
          {tech}
        </Text>
      ))}
    </View>
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

function formatLinkLabel(link) {
  if (!link?.href) return link?.label || "";
  try {
    const url = new URL(link.href);
    const pathName = url.pathname && url.pathname !== "/" ? url.pathname : "";
    return `${url.hostname}${pathName}`;
  } catch {
    return link.label || link.href;
  }
}

function getLinkIconPath(kind) {
  if (kind === "github") {
    return "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z";
  }
  if (kind === "linkedin") {
    return "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z";
  }
  return "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z";
}

function getContactIconPath(kind) {
  if (kind === "email") {
    return "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z";
  }
  return "M22 16.92V20a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.18 2 2 0 0 1 4 2h3.09a2 2 0 0 1 2 1.72c.12.9.32 1.77.57 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.12a2 2 0 0 1 2.11-.45c.83.25 1.7.45 2.6.57a2 2 0 0 1 1.72 2.01z";
}

function resolvePublicImage(src) {
  if (!src) return null;
  if (src.startsWith("/")) return path.join(PUBLIC_DIR, src);
  return src;
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

function Section({ title, children, minPresenceAhead, breakBefore = false }) {
  if (!children) return null;
  return (
    <View style={styles.section} minPresenceAhead={minPresenceAhead} break={breakBefore}>
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

export default function CvPdfDocument({ cv, locale = "en", showPhone = false }) {
  const strings = t(locale);
  const presentLabel = strings.present;

  const contact = cv?.person?.contact;
  const showPhoneContact = Boolean(showPhone && contact?.phone);
  const links = contact?.links || [];
  const skillsHighlight = cv?.skills?.highlight || [];
  const skillsExperienced = cv?.skills?.experienced || [];
  const languages = cv?.languages || [];
  const programmingLanguages = cv?.programmingLanguages?.items || [];
  const recentNonProfit = [];
  const otherActivities = [];
  const locationParts = [
    cv?.person?.location?.city,
    cv?.person?.location?.country,
  ].filter(Boolean);
  const locationLine = locationParts.join(", ");

  return (
    <Document title={`${cv.person.name} - CV`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.topPadRow} fixed>
          <View style={styles.topPadSidebar} />
          <View style={styles.topPadMain} />
        </View>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Section title={strings.contact}>
            <View style={{ marginTop: 10 }}>
              {contact?.email ? (
                <View style={styles.linkRow}>
                  <Svg width={10} height={10} viewBox="0 0 24 24" style={styles.linkIcon}>
                    <Path d={getContactIconPath("email")} fill={ACCENT} />
                  </Svg>
                  <Text style={styles.linkText}>
                    <Link style={styles.link} src={`mailto:${contact.email}`}>
                      {contact.email}
                    </Link>
                  </Text>
                </View>
              ) : null}
              {showPhoneContact ? (
                <View style={styles.linkRow}>
                  <Svg width={10} height={10} viewBox="0 0 24 24" style={styles.linkIcon}>
                    <Path d={getContactIconPath("phone")} fill={ACCENT} />
                  </Svg>
                  <Text style={styles.linkText}>
                    <Link
                      style={styles.link}
                      src={`tel:${String(contact.phone).replace(/\s+/g, "")}`}
                    >
                      {contact.phone}
                    </Link>
                  </Text>
                </View>
              ) : null}
            </View>
          </Section>

          {links?.length ? (
            <Section title={strings.links}>
              <View style={{ marginTop: 10 }}>
                {links.map((l) => (
                  <View key={l.href} style={styles.linkRow}>
                    <Svg
                      width={10}
                      height={10}
                      viewBox="0 0 24 24"
                      style={styles.linkIcon}
                    >
                      <Path d={getLinkIconPath(l.kind)} fill={ACCENT} />
                    </Svg>
                    <Text style={styles.linkText}>
                      <Link style={styles.link} src={l.href}>
                        {formatLinkLabel(l)}
                      </Link>
                    </Text>
                  </View>
                ))}
              </View>
            </Section>
          ) : null}

          {skillsHighlight.length || skillsExperienced.length ? (
            <Section title={strings.skills}>
              {skillsHighlight.length ? (
                <View style={{ marginTop: 6 }}>
                  <Text style={styles.skillLabel}>
                    {locale === "pl" ? "Mocne" : "Strong"}
                  </Text>
                  <PillList items={skillsHighlight} limit={18} />
                </View>
              ) : null}
              {skillsExperienced.length ? (
                <View style={{ marginTop: 6 }}>
                  <Text style={styles.skillLabel}>
                    {locale === "pl" ? "Doświadczenie" : "Experienced"}
                  </Text>
                  <PillList items={skillsExperienced} limit={18} />
                </View>
              ) : null}
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
                          <PdfLanguageIcon name={pl.name} size={10} />
                        </View>
                        <Text style={styles.small}>
                          <Text style={{ fontWeight: 700 }}>{pl.name}</Text>
                          {exp ? <Text style={styles.muted}>{` (${exp})`}</Text> : null}
                        </Text>
                      </View>
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
          <View style={styles.identityRow}>
            <Image src={PROFILE_PHOTO_PATH} style={styles.profilePhoto} />
            <View style={styles.identityText}>
              <Text style={styles.name}>{cv.person.name}</Text>
              <Text style={styles.headline}>{cv.person.headline}</Text>
            </View>
          </View>
          {locationLine ? (
            <Text style={styles.location}>{locationLine}</Text>
          ) : null}

          {cv.person.summary?.paragraphs?.length ? (
            <View style={styles.summary}>
              <Text style={styles.summaryText}>
                {cv.person.summary.paragraphs.join(" ")}
              </Text>
            </View>
          ) : null}

          {cv.experience?.length ? (
            <Section title={strings.experience} minPresenceAhead={90}>
              <View style={{ marginTop: 4 }}>
                {cv.experience.map((company, idx) => {
                  const companyTech = (company.roles || [])
                    .flatMap((role) => role.tech || [])
                    .filter(Boolean);
                  const { languages: companyLangs, other: companyOther } =
                    splitTechIntoLanguagesAndOther(companyTech);
                  const uniqueLangs = Array.from(new Set(companyLangs));
                  const uniqueOther = Array.from(new Set(companyOther));

                  return (
                    <View
                      key={company.company.name}
                      style={idx === 0 ? styles.itemFirst : styles.item}
                      minPresenceAhead={90}
                    >
                    {company.roles?.map((role, roleIndex) => {
                      const nextLocationLine = role.location
                        ? `${locationPrefix(role.locationMeta)}${role.location}`
                        : null;
                      const showLocation = roleIndex === 0 && nextLocationLine;
                      const dateText = formatRange(role, locale, presentLabel);

                      return (
                      <View
                        key={`${company.company.name}-${role.title}-${role.start}`}
                        style={{ marginTop: 6, marginBottom: 4 }}
                        wrap={false}
                      >
                        <View style={styles.itemHeaderRow}>
                          <View>
                            <View style={styles.companyHeader}>
                              {company.company.logo?.src ? (
                                <Image
                                  src={resolvePublicImage(company.company.logo.src)}
                                  style={styles.companyLogo}
                                />
                              ) : null}
                              <View style={styles.companyText}>
                                <Text style={styles.companyName}>{company.company.name}</Text>
                              </View>
                            </View>
                            <Text style={styles.roleTitleInline}>{role.title}</Text>
                          </View>
                          <View style={{ alignItems: "flex-end" }}>
                            {showLocation ? (
                              <Text style={styles.metaRightSmall}>{nextLocationLine}</Text>
                            ) : null}
                            <Text style={styles.metaRight}>{dateText}</Text>
                          </View>
                        </View>
                        <BulletList items={role.highlights} />
                      </View>
                      );
                    })}
                    {uniqueLangs.length || uniqueOther.length ? (
                      <TechBadges languages={uniqueLangs} other={uniqueOther} />
                    ) : null}
                  </View>
                  );
                })}
              </View>
            </Section>
          ) : null}

          {recentNonProfit.length ? (
            <Section title={strings.projects} minPresenceAhead={140}>
              <Text style={styles.subSectionTitle}>
                {locale === "pl" ? "Ostatnie projekty non-profit" : "Recent non-profit"}
              </Text>
              <View style={{ marginTop: 6 }}>
                {recentNonProfit.map((p, idx) => {
                  const mainLanguage = inferMainLanguageFromTechList(p.tech);
                  const { languages: langs, other } = splitTechIntoLanguagesAndOther(p.tech);

                  return (
                    <View
                      key={p.name}
                      style={idx === 0 ? styles.itemFirst : styles.item}
                      wrap={false}
                    >
                      <View style={styles.itemHeaderRow}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          {mainLanguage ? (
                            <View style={[styles.iconChip, { marginRight: 8, marginBottom: 0 }]}>
                              <PdfLanguageIcon name={mainLanguage} size={10} />
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

                      {p.tech?.length ? <TechBadges languages={langs} other={other} /> : null}
                    </View>
                  );
                })}
              </View>
            </Section>
          ) : null}

          {cv.education?.length ? (
            <Section title={strings.education} minPresenceAhead={120}>
              <View style={{ marginTop: 6 }}>
                {cv.education.map((e, idx) => (
                  <View key={e.school} style={idx === 0 ? styles.itemFirst : styles.item}>
                    <View style={styles.itemHeaderRow}>
                      <View>
                        <View style={styles.companyHeader}>
                          {e.logo?.src ? (
                            <Image
                              src={resolvePublicImage(e.logo.src)}
                              style={styles.companyLogo}
                            />
                          ) : null}
                          <Text style={styles.companyName}>{e.school}</Text>
                        </View>
                        <Text style={styles.roleTitleInline}>
                          {e.degree} · {e.field}
                        </Text>
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
                        <Text style={styles.metaRightSmall}>
                          {locationPrefix(e.locationMeta)}{e.location}
                        </Text>
                        <Text style={styles.metaRight}>
                          {e.startYear} – {e.endYear}
                        </Text>
                      </View>
                    </View>
                    <BulletList items={(e.achievements || []).slice(0, 3)} />
                    {e.technologies?.length ? (() => {
                      const { languages: langs, other } = splitTechIntoLanguagesAndOther(e.technologies);
                      return <TechBadges languages={langs} other={other} />;
                    })() : null}
                  </View>
                ))}
              </View>
            </Section>
          ) : null}

          {otherActivities.length ? (
            <Section title={strings.otherActivities} minPresenceAhead={120}>
              <View style={{ marginTop: 8 }}>
                {otherActivities.map((a, idx) => (
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

      </Page>
    </Document>
  );
}
