import { permanentRedirect } from "next/navigation";

export default async function ProjectDetailPagePl({ params }) {
  const { slug } = await params;
  permanentRedirect(`/pl/${slug}`);
}
