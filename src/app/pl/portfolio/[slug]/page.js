import { permanentRedirect } from "next/navigation";

export default async function PortfolioDetailPagePl({ params }) {
  const { slug } = await params;
  permanentRedirect(`/pl/projects/${slug}`);
}
