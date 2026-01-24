import { notFound } from "next/navigation";
import LocalizedCvPage, { getCvMetadata } from "@/app/_components/LocalizedCvPage";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  const base = await getCvMetadata(resolvedLocale);

  return {
    ...base,
    title: `${base.title} — Campy`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CvCampyPage({ params }) {
  notFound();
  const { locale } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  return <LocalizedCvPage locale={resolvedLocale} variant="campy" />;
}
