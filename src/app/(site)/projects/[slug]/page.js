import LocalizedPortfolioDetailPage, {
  getPortfolioDetailMetadata,
} from "@/app/_components/LocalizedPortfolioDetailPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return getPortfolioDetailMetadata({ slug, locale: "en" });
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  return <LocalizedPortfolioDetailPage slug={slug} locale="en" />;
}
