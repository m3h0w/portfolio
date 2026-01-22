import LocalizedPortfolioDetailPage, {
  getPortfolioDetailMetadata,
} from "@/app/_components/LocalizedPortfolioDetailPage";
import portfolioItems from "@/data/portfolio";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ["en", "pl"];
  return locales.flatMap((locale) =>
    portfolioItems.map((item) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  return getPortfolioDetailMetadata({ slug, locale: resolvedLocale });
}

export default async function ProjectDetailPage({ params }) {
  const { locale, slug } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  return <LocalizedPortfolioDetailPage slug={slug} locale={resolvedLocale} />;
}
