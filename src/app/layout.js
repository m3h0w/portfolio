import { Alegreya, Fira_Code, Montserrat, Open_Sans, VT323 } from "next/font/google";
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

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: ["400"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Michal Gacka",
  description: "Portfolio of Michal Gacka",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${openSans.variable} ${alegreya.variable} ${vt323.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
