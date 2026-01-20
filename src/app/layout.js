import {
  Alegreya,
  Fira_Code,
  Montserrat,
  Open_Sans,
  Sora,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

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
  title: "Michal Gacka",
  description: "Portfolio of Michal Gacka",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${openSans.variable} ${alegreya.variable} ${firaCode.variable} ${sora.variable} antialiased min-h-screen bg-[linear-gradient(39deg,rgba(230,230,230,1)_0%,rgba(255,255,255,1)_100%)] text-[var(--foreground)] font-sans [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_h4]:font-display [&_h5]:font-display [&_h6]:font-display`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
