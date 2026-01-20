import { permanentRedirect } from "next/navigation";

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  permanentRedirect(`/${slug}`);
}
