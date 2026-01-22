import LocalizedHomePage from "@/app/_components/LocalizedHomePage";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  const ogImage = `/og/home-${resolvedLocale}.png`;

  return {
    alternates: {
      canonical: resolvedLocale === "pl" ? "/pl" : "/",
      languages: {
        en: "/",
        pl: "/pl",
        "x-default": "/",
      },
    },
    openGraph: {
      locale: resolvedLocale === "pl" ? "pl_PL" : "en_US",
      alternateLocale: resolvedLocale === "pl" ? ["en_US"] : ["pl_PL"],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const resolvedLocale = locale === "pl" ? "pl" : "en";
  return <LocalizedHomePage locale={resolvedLocale} />;
}
