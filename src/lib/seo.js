function getRawSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
    "https://michalgacka.com"
  );
}

export function getSiteUrl() {
  const raw = getRawSiteUrl();
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

export function absoluteUrl(pathname = "/") {
  const base = getSiteUrl();
  if (!base) return null;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function personJsonLd() {
  const url = absoluteUrl("/") || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Michał Gacka",
    jobTitle: "Software Engineer",
    url,
    sameAs: [
      "https://github.com/m3h0w",
      "https://www.linkedin.com/in/michalgacka/",
      "https://stackoverflow.com/users/6331998/m3h0w",
      "https://dev.to/m3h0w",
    ],
  };
}

export function websiteJsonLd() {
  const url = absoluteUrl("/") || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Michał Gacka",
    description: "Portfolio of Michal Gacka",
    url,
    inLanguage: ["en", "pl"],
    author: {
      "@type": "Person",
      name: "Michał Gacka",
    },
  };
}

export function breadcrumbJsonLd({ locale, title, slug }) {
  const homePath = locale === "pl" ? "/pl" : "/";
  const projectPath = locale === "pl" ? `/pl/${slug}` : `/${slug}`;

  const homeUrl = absoluteUrl(homePath) || homePath;
  const projectUrl = absoluteUrl(projectPath) || projectPath;

  const homeName = locale === "pl" ? "Projekty" : "Projects";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeName,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: projectUrl,
      },
    ],
  };
}

function inferProjectSchemaType(categories = []) {
  const normalized = categories.map((c) => String(c).toLowerCase());

  if (
    normalized.some(
      (c) => c.includes("web app") || c.includes("mobile app") || c.includes("saas")
    )
  ) {
    return "SoftwareApplication";
  }

  if (
    normalized.some(
      (c) => c.includes("landing") || c.includes("website") || c.includes("site")
    )
  ) {
    return "WebSite";
  }

  return "CreativeWork";
}

export function projectJsonLd({
  locale,
  slug,
  title,
  description,
  image,
  keywords,
  categories,
}) {
  const path = locale === "pl" ? `/pl/${slug}` : `/${slug}`;
  const url = absoluteUrl(path) || path;

  const imageUrl = image ? absoluteUrl(image) || image : undefined;
  const schemaType = inferProjectSchemaType(categories);

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: title,
    description,
    url,
    inLanguage: locale,
    image: imageUrl ? [imageUrl] : undefined,
    author: {
      "@type": "Person",
      name: "Michał Gacka",
    },
    keywords: Array.isArray(keywords) && keywords.length ? keywords : undefined,
  };
}
