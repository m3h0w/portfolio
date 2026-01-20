import LocalizedPortfolioDetailPage, {
  getPortfolioDetailMetadata,
} from "@/app/_components/LocalizedPortfolioDetailPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return getPortfolioDetailMetadata({ slug, locale: "pl" });
}

export default async function ProjectDetailPagePl({ params }) {
  const { slug } = await params;
  return <LocalizedPortfolioDetailPage slug={slug} locale="pl" />;
}
