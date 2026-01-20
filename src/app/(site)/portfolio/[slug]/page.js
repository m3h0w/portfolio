import { permanentRedirect } from "next/navigation";

export default async function PortfolioDetailPage({ params }) {
  const { slug } = await params;
  permanentRedirect(`/projects/${slug}`);
}
