import HomeClient from "@/app/_components/HomeClient";

export default function LocalizedHomePage({ locale }) {
  const basePath = locale === "pl" ? "/pl" : "";
  return <HomeClient locale={locale} basePath={basePath} />;
}
