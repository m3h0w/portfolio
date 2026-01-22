import portfolioItems from "@/data/portfolio";
import { getSiteUrl } from "@/lib/seo";

function getLastModified() {
  // If you later add per-item dates, you can use them here.
  return new Date();
}

export default function sitemap() {
  const siteUrl = getSiteUrl();
  const base = siteUrl ? siteUrl.replace(/\/+$/, "") : "";
  const lastModified = getLastModified();

  const staticRoutes = ["/", "/pl", "/me", "/pl/me", "/cv", "/pl/cv"].map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" || path === "/pl" ? 1 : 0.7,
  }));

  const portfolioRoutes = portfolioItems.flatMap((item) => {
    const slug = item.slug;
    if (!slug) return [];

    return [
      {
        url: `${base}/${slug}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.8,
      },
      {
        url: `${base}/pl/${slug}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.8,
      },
    ];
  });

  return [...staticRoutes, ...portfolioRoutes];
}
