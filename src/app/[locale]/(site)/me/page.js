import LocalizedMePage, { getMeMetadata } from "@/app/_components/LocalizedMePage";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  return getMeMetadata(resolvedLocale);
}

export default async function MePage({ params }) {
  const { locale } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  return <LocalizedMePage locale={resolvedLocale} />;
}
