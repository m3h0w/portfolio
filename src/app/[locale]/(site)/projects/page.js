import { permanentRedirect } from "next/navigation";

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  permanentRedirect(resolvedLocale === "pl" ? "/pl" : "/");
}
