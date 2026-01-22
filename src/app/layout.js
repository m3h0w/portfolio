import {
  Alegreya,
  Fira_Code,
  Montserrat,
  Open_Sans,
  Sora,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { headers } from "next/headers";
import "./globals.css";
import { getSiteUrl, personJsonLd, websiteJsonLd } from "@/lib/seo";

const siteUrl = getSiteUrl();

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const alegreya = Alegreya({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "Michał Gacka - Software Engineer",
  description: "Michał Gacka's professional portfolio website.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  openGraph: {
    title: "Michał Gacka - Software Engineer",
    description: "Michał Gacka's professional portfolio website.",
    type: "website",
    siteName: "Michał Gacka",
    locale: "en_US",
    alternateLocale: ["pl_PL"],
    images: [{ url: "/og/site.png", alt: "Michał Gacka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michał Gacka",
    description: "Michał Gacka's professional portfolio website.",
    images: ["/og/site.png"],
  },
};

export default async function RootLayout({ children }) {
  const headerList = await headers();
  const locale = headerList.get("x-locale") === "pl" ? "pl" : "en";
  const jsonLd = [websiteJsonLd(), personJsonLd()];

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <script
          type="application/ld+json"
          // JSON-LD must be injected as a raw string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} ${alegreya.variable} ${firaCode.variable} ${sora.variable} antialiased min-h-screen bg-[linear-gradient(39deg,rgba(230,230,230,1)_0%,rgba(255,255,255,1)_100%)] text-[var(--foreground)] font-sans [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_h4]:font-display [&_h5]:font-display [&_h6]:font-display`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
