"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSiteContent } from "@/data/siteContent";
import { AnimatePresence, motion } from "framer-motion";
import GlassesBadge from "@/components/GlassesBadge";
import CircleFlagIcon from "@/components/CircleFlagIcon";

function SocialIcon({ name }) {
  const common = "h-4 w-4";
  switch (name) {
    case "Stack Overflow":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
          <path d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.993.346 1.62 9.335 1.994-.346zm-5.964 6.937l-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587l-9.276-2.608-.526 1.954 9.306 2.5.496-1.846zm1.204-2.413l-8.297-4.864-1.029 1.743 8.298 4.865 1.028-1.744zm1.866-1.467l-5.339-7.829-1.672 1.14 5.339 7.829 1.672-1.14zm-2.644 4.195v8h-12v-8h-2v10h16v-10h-2z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "Dev.to blog":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
          <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6v4.36h.58c.37 0 .67-.06.84-.23.16-.16.26-.49.26-.95v-2c0-.46-.1-.79-.26-.95zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.07.77H4.33v-8.1h2.25c.95 0 1.51.16 1.98.71.42.54.49 1.4.49 2.76v1.2c0 1.36-.12 2.08-.49 2.66zm5.55-1.21c0 1.49-.62 2.38-1.88 2.38-.6 0-1.08-.21-1.44-.64v.53h-2.1v-8.1h2.1v2.7c.36-.43.84-.64 1.44-.64 1.26 0 1.88.89 1.88 2.38v1.4zm6.22-1.21c0-.6-.04-1.19-.12-1.77h-1.89v.94c-.44-.65-1.11-.97-2-.97-1.6 0-2.64 1.26-2.64 3.05 0 1.79 1.04 3.05 2.64 3.05.89 0 1.56-.32 2-.97v.88h1.89v-4.21h-2.52v1.48h.64v.37c0 .54-.4.88-.98.88-.75 0-1.17-.6-1.17-1.51 0-.91.42-1.51 1.17-1.51.52 0 .88.26.98.72h1.89z" />
        </svg>
      );
    default:
      return null;
  }
}

function NavLink({ href, label, active, onNavigate }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-all \
        ${
          active
            ? "bg-gradient-to-r from-[var(--accent)]/10 to-transparent text-[var(--accent)] shadow-sm ring-1 ring-[var(--accent)]/20"
            : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
        }`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

function LanguageToggle({ language, onChange }) {
  const entries = [
    { code: "en", label: "English" },
    { code: "pl", label: "Polski" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Language"
      className="relative inline-grid cursor-pointer grid-cols-2 items-stretch overflow-hidden rounded-full bg-white/85 p-0.5 shadow-xl ring-1 ring-slate-200/70 backdrop-blur"
      onClick={(event) => {
        if (event.target?.closest?.("button")) return;

        // Avoid forced layout reads (PSI forced reflow). If the user clicks the
        // track instead of a button, just toggle.
        onChange(language === "pl" ? "en" : "pl");
      }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 rounded-full bg-white/90 shadow-sm ring-1 ring-black/5"
        animate={{ x: language === "pl" ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.8 }}
      />
      {entries.map((entry) => {
        const isActive = entry.code === language;
        return (
          <button
            key={entry.code}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`Switch language to ${entry.label}`}
            onClick={() => onChange(entry.code)}
            className={`relative z-10 grid h-11 w-full min-w-12 cursor-pointer select-none place-items-center rounded-full px-3 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 md:h-8 \
              ${
                isActive
                  ? "text-[var(--accent)]"
                  : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
              }`}
          >
            <span aria-hidden="true" className="grid place-items-center">
              <CircleFlagIcon code={entry.code} className="h-5 w-5" />
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SidebarContent({
  onNavigate,
  showNav = true,
  language,
  onLanguageChange,
  navOnTop = false,
}) {
  const [profileHovered, setProfileHovered] = useState(false);
  const hoverOffTimeoutRef = useRef(null);

  const setProfileHoverOn = () => {
    if (hoverOffTimeoutRef.current) {
      clearTimeout(hoverOffTimeoutRef.current);
      hoverOffTimeoutRef.current = null;
    }
    setProfileHovered(true);
  };

  const setProfileHoverOff = () => {
    if (hoverOffTimeoutRef.current) clearTimeout(hoverOffTimeoutRef.current);
    hoverOffTimeoutRef.current = setTimeout(() => {
      setProfileHovered(false);
      hoverOffTimeoutRef.current = null;
    }, 60);
  };

  useEffect(() => {
    return () => {
      if (hoverOffTimeoutRef.current) {
        clearTimeout(hoverOffTimeoutRef.current);
        hoverOffTimeoutRef.current = null;
      }
    };
  }, []);

  const pathname = usePathname();
  const isPlRoute = pathname === "/pl" || pathname?.startsWith("/pl/");
  const basePath = isPlRoute ? "/pl" : "";
  const homePath = basePath || "/";
  const isMe = pathname === `${basePath}/me`;
  const isCv = pathname === `${basePath}/cv`;
  const isPortfolio = !isMe && !isCv;
  const isProfileInteractive = !isMe;
  const siteContent = getSiteContent(language);

  const nav = (
    <nav className="px-5 pb-3 md:pb-4">
      <div
        className={`mx-auto flex w-fit items-center gap-1 rounded-full bg-white/85 py-0.5 px-0.5 shadow-xl ring-1 ring-slate-200/70 backdrop-blur ${
          navOnTop ? "mt-1" : "mt-6 md:mt-8"
        }`}
      >
        <NavLink
          href={homePath}
          label={siteContent.nav.portfolio}
          active={isPortfolio}
          onNavigate={onNavigate}
        />
        <NavLink
          href={`${basePath}/me`}
          label={siteContent.nav.aboutMe}
          active={isMe}
          onNavigate={onNavigate}
        />
      </div>
    </nav>
  );

  return (
    <div
      className={`relative flex min-h-full flex-col ${
        navOnTop
          ? "justify-start py-2 md:py-3"
          : "justify-center py-4 md:py-6 md:-translate-y-3"
      }`}
    >
      {showNav && navOnTop && nav}
      {/* Profile header */}
      <div className={`px-5 ${navOnTop ? "pt-4" : "pt-8"}`}>
        <div className="flex flex-col items-center text-center">
          <div className="relative w-full">
            <div className="relative z-20 flex justify-center pb-4 md:pb-6">
              <LanguageToggle language={language} onChange={onLanguageChange} />
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-[var(--accent)]/12 blur-3xl md:h-44 md:w-44"
                />

                {isProfileInteractive ? (
                  <Link
                    href={`${basePath}/me`}
                    onClick={onNavigate}
                    aria-label={siteContent.nav.aboutMe}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 rounded-3xl"
                  >
                    <motion.div
                      onHoverStart={setProfileHoverOn}
                      onHoverEnd={setProfileHoverOff}
                      onFocus={setProfileHoverOn}
                      onBlur={setProfileHoverOff}
                      animate={
                        profileHovered
                          ? { rotate: 1, scale: 1.02 }
                          : { rotate: 0, scale: 1 }
                      }
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="relative h-40 w-40 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/10 cursor-pointer md:h-46 md:w-46"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-[var(--accent)]/25 via-transparent to-slate-200/50"
                      />
                      <div className="absolute inset-0 overflow-hidden rounded-3xl">
                        <Image
                          src="/images/me2.jpg"
                          alt={siteContent.name}
                          fill
                          sizes="(min-width: 768px) 184px, 160px"
                          className="object-cover"
                          priority
                          fetchPriority="high"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"
                        />
                      </div>
                    </motion.div>
                  </Link>
                ) : (
                  <div className="block rounded-3xl">
                    <div className="relative h-40 w-40 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/10 cursor-default md:h-46 md:w-46">
                      <div
                        aria-hidden="true"
                        className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-[var(--accent)]/25 via-transparent to-slate-200/50"
                      />
                      <div className="absolute inset-0 overflow-hidden rounded-3xl">
                        <Image
                          src="/images/me2.jpg"
                          alt={siteContent.name}
                          fill
                          sizes="(min-width: 768px) 184px, 160px"
                          className="object-cover"
                          priority
                          fetchPriority="high"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {isProfileInteractive ? (
              <Link
                href={`${basePath}/me`}
                onClick={onNavigate}
                className="absolute -bottom-7 -left-5 -right-5 focus:outline-none md:-bottom-8"
                aria-label={siteContent.nav.aboutMe}
              >
                <motion.div
                  onHoverStart={setProfileHoverOn}
                  onHoverEnd={setProfileHoverOff}
                  onFocus={setProfileHoverOn}
                  onBlur={setProfileHoverOff}
                  animate={
                    profileHovered
                      ? { rotate: -1, scale: 1.01 }
                      : { rotate: 0, scale: 1 }
                  }
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="bg-gradient-to-r from-[var(--accent)]/10 via-white/85 to-white/85 px-3 py-1 shadow-xl ring-1 ring-slate-200/70 backdrop-blur cursor-pointer md:px-4"
                >
                  <div className="flex items-center justify-center gap-3">
                    <GlassesBadge
                      size={40}
                      iconSize={30}
                      className="shrink-0 scale-[0.9] md:scale-100"
                    />
                    <div className="leading-tight">
                      <h1 className="text-lg font-bold tracking-tight text-slate-900 uppercase -mt-0.5 md:text-xl">
                        {siteContent.name}
                      </h1>
                      <p className="-mt-1 text-sm font-medium text-[var(--accent)] md:text-[0.97rem]">
                        {siteContent.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : (
              <div
                className="absolute -bottom-7 -left-5 -right-5 md:-bottom-8"
                aria-label={siteContent.nav.aboutMe}
              >
                <motion.div
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="bg-gradient-to-r from-[var(--accent)]/10 via-white/85 to-white/85 px-3 py-1 shadow-xl ring-1 ring-slate-200/70 backdrop-blur cursor-default md:px-4"
                >
                  <div className="flex items-center justify-center gap-3">
                    <GlassesBadge
                      size={40}
                      iconSize={30}
                      className="shrink-0 scale-[0.9] md:scale-100"
                    />
                    <div className="leading-tight">
                      <h1 className="text-lg font-bold tracking-tight text-slate-900 uppercase md:text-xl">
                        {siteContent.name}
                      </h1>
                      <p className="-mt-1 text-sm font-medium text-[var(--accent)] md:text-[0.92rem]">
                        {siteContent.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-10 space-y-2 text-[13px] leading-relaxed text-slate-600 text-center md:mt-12 md:space-y-3">
          <p>{siteContent.intro.paragraphs[0]}</p>
          <p>
            {siteContent.intro.highlightedLink.prefix}{" "}
            <a
              href={siteContent.intro.highlightedLink.href}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-2 transition hover:decoration-[var(--accent)]"
            >
              {siteContent.intro.highlightedLink.label}
            </a>
            {siteContent.intro.highlightedLink.suffix}
          </p>
        </div>

        {/* Social links */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-center md:mt-5">
          {siteContent.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
              title={link.label}
            >
              <SocialIcon name={link.label} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-center">
          <Link
            href={`${basePath}/cv`}
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
            title="Curriculum Vitae"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden
            >
              <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M9 13h6" />
              <path d="M9 17h6" />
            </svg>
            <span>{language === "pl" ? "Curriculum Vitae" : "Curriculum Vitae"}</span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      {showNav && !navOnTop && nav}
    </div>
  );
}

export default function SidebarNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isAutoOpenPath =
    pathname === "/" ||
    pathname === "/pl" ||
    pathname === "/projects" ||
    pathname === "/pl/projects";

  const [mobileOpen, setMobileOpen] = useState(() => isAutoOpenPath);
  const [allowMobileAnimate, setAllowMobileAnimate] = useState(false);
  const isPlRoute = pathname === "/pl" || pathname?.startsWith("/pl/");
  const language = isPlRoute ? "pl" : "en";
  const closeMobile = () => setMobileOpen(false);
  const siteContent = getSiteContent(language);

  useEffect(() => {
    setAllowMobileAnimate(true);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const handleLanguageChange = (nextLanguage) => {
    const currentPath = pathname || "/";
    const rest = currentPath.startsWith("/pl")
      ? currentPath.slice(3) || "/"
      : currentPath;
    const nextPath =
      nextLanguage === "pl" ? `/pl${rest === "/" ? "" : rest}` : rest;
    router.push(nextPath);
  };

  return (
    <>
      {/* Mobile floating toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        className="fixed left-0 top-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-r-lg rounded-l-none border border-l-0 border-slate-200/70 bg-white/90 text-slate-700 shadow-lg backdrop-blur-xl transition hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 md:hidden"
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
      >
        {mobileOpen ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={language === "pl" ? "Nawigacja" : "Navigation"}
            initial={allowMobileAnimate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
              onClick={closeMobile}
              aria-label="Close navigation"
              initial={allowMobileAnimate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            />
            <motion.aside
              className="absolute left-0 top-0 h-full w-[85%] max-w-xs overflow-y-auto border-r border-slate-200/60 bg-white/95 shadow-2xl backdrop-blur-xl"
              style={{ transformOrigin: "left center" }}
              initial={
                allowMobileAnimate
                  ? { x: "-100%", rotate: -1.5, scale: 0.98 }
                  : false
              }
              animate={{ x: 0, rotate: 0, scale: 1 }}
              exit={{ x: "-100%", rotate: -1.5, scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 520,
                damping: 42,
                mass: 0.7,
              }}
            >
              <div className="flex h-12 items-center justify-end px-3">
                <button
                  type="button"
                  onClick={closeMobile}
                  className="grid h-11 w-11 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close navigation"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M15 18l-6-6 6-6" />
                    <path d="M21 12H9" />
                  </svg>
                </button>
              </div>
              <SidebarContent
                onNavigate={closeMobile}
                language={language}
                onLanguageChange={handleLanguageChange}
                navOnTop
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-80 shrink-0 overflow-y-auto border-r border-slate-200/60 bg-gradient-to-b from-white via-slate-50/50 to-white md:sticky md:top-0 md:block">
        <SidebarContent
          showNav={false}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      </aside>
    </>
  );
}
