import Link from "next/link";
import Image from "next/image";
import AbstractBackdrop from "@/components/AbstractBackdrop";
import { getSiteContent } from "@/data/siteContent";
import styles from "@/app/me/page.module.css";

export function getMeMetadata(locale) {
  const siteContent = getSiteContent(locale);
  return {
    title: `${siteContent.name} | ${locale === "pl" ? "O mnie" : "Me"}`,
    description: locale === "pl" ? `O ${siteContent.name}` : `About ${siteContent.name}`,
  };
}

export default function LocalizedMePage({ locale }) {
  const siteContent = getSiteContent(locale);
  const basePath = locale === "pl" ? "/pl" : "";

  return (
    <div className={`relative flex min-h-screen flex-col ${styles.page}`}>
      <AbstractBackdrop variant="me" />

      <main className="relative mx-auto flex w-full max-w-2xl flex-1 flex-col justify-start px-6 pt-10 pb-14 sm:px-8 sm:pt-12 sm:pb-16">
        <div className="flex justify-center">
          <Link
            href={`${basePath}/`}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur hover:bg-white"
          >
            <span aria-hidden>←</span>
            {siteContent.ui.backToPortfolio}
          </Link>
        </div>
        <div className="mx-auto mb-8 mt-8">
          <div className={styles.portraitFrame}>
            <div className={styles.portraitInner}>
              <Image
                src={siteContent.about.image.src}
                alt={siteContent.about.image.alt}
                width={280}
                height={373}
                className="h-auto w-56 object-cover sm:w-64"
                priority
              />
            </div>
          </div>
        </div>

        <div
          className={`${styles.prose} space-y-4 text-center text-[15px] leading-7 text-slate-700 sm:text-base`}
        >
          {siteContent.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">{siteContent.contact.description}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {siteContent.contact.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.pillLink}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label === "E-mail" ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4 text-(--accent)"
                    aria-hidden="true"
                  >
                    <path d="M4 6h16v12H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 text-(--accent)"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                )}
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
