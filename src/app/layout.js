import {
  Alegreya,
  Fira_Code,
  Montserrat,
  Open_Sans,
  Sora,
} from "next/font/google";
import "./globals.css";

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
        className={`${montserrat.variable} ${openSans.variable} ${alegreya.variable} ${firaCode.variable} ${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
