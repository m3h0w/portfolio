export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

export default function LocaleLayout({ children }) {
  return children;
}
