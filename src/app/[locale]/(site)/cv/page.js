import LocalizedCvPage, { getCvMetadata } from "@/app/_components/LocalizedCvPage";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  return getCvMetadata(resolvedLocale);
}

export default async function CvPage({ params }) {
  const { locale } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  return <LocalizedCvPage locale={resolvedLocale} />;
}
