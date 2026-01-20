"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ active = "portfolio" }) {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowLogo(window.scrollY >= 45);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (tab) =>
    `nav-link-glow px-3 py-2 text-sm font-semibold text-white/90 transition hover:text-white ${
      active === tab ? "text-white" : ""
    }`;

  return (
    <div className="navbar-wrapper">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[linear-gradient(208deg,_rgba(16,7,54,1)_0%,_rgba(39,29,50,1)_59%,_rgba(81,16,97,1)_80%,_rgba(155,0,189,1)_100%)] shadow-[0_4px_2px_-2px_rgba(0,0,0,0.2)]">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            id="logo"
            href="/projects"
            className={`flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-white transition-opacity duration-500 ${
              showLogo ? "opacity-100" : "opacity-70"
            }`}
          >
            <Image
              src="/icon.svg"
              width={18}
              height={18}
              alt=""
              aria-hidden="true"
              className="block shrink-0 invert"
            />
            MICHAŁ GACKA
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/projects" className={navLinkClass("portfolio")}>
              Projects
            </Link>
            <Link href="/me" className={navLinkClass("me")}>
              Me
            </Link>
          </div>
        </div>
      </nav>
      <div className="h-14" />
    </div>
  );
}
