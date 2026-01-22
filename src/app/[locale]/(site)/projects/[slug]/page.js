import { permanentRedirect } from "next/navigation";

export default async function ProjectsDetailPage({ params }) {
  const { locale, slug } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  permanentRedirect(resolvedLocale === "pl" ? `/pl/${slug}` : `/${slug}`);
}
