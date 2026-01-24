import LocalizedCvPage, { getCvMetadata } from "@/app/_components/LocalizedCvPage";
import { getCvVariantFromSearchParams } from "@/data/cv_bundle";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  return getCvMetadata(resolvedLocale);
}

export default async function CvPage({ params, searchParams }) {
  const { locale } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  const resolvedSearchParams = await searchParams;
  const variant = getCvVariantFromSearchParams(resolvedSearchParams);
  return <LocalizedCvPage locale={resolvedLocale} variant={variant} />;
}
