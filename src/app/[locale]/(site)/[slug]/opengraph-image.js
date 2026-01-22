import { ImageResponse } from "next/og";
import portfolioItems from "@/data/portfolio";
import { getSiteContent } from "@/data/siteContent";
import {
  fetchPublicImageArrayBuffer,
  getLocaleFromParams,
  OG_BACKDROPS,
} from "@/app/_og/ogImageUtils";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const locale = await getLocaleFromParams(params);
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const siteContent = getSiteContent(locale);
  const item = portfolioItems.find((entry) => entry.slug === slug);
  const data = item?.i18n?.[locale] || item?.i18n?.en;

  const title = data?.title || siteContent.name;
  const subtitle = data?.subtitle || (locale === "pl" ? "Projekt" : "Project");
  const kicker = locale === "pl" ? "Portfolio" : "Portfolio";
  const categories = Array.isArray(item?.categories)
    ? item.categories.slice(0, 3)
    : [];

  const projectImagePath = data?.heroImage || data?.thumbnail || null;
  const projectImage = projectImagePath
    ? await fetchPublicImageArrayBuffer(projectImagePath)
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px",
          background: OG_BACKDROPS.detail,
          color: "#0f172a",
          position: "relative",
          overflow: "hidden",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "54%",
            paddingRight: "42px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                padding: "10px 16px",
                borderRadius: "999px",
                background: "rgba(79, 70, 229, 0.10)",
                border: "1px solid rgba(79, 70, 229, 0.22)",
                fontSize: 18,
                textTransform: "capitalize",
                letterSpacing: "0.08em",
                fontWeight: 650,
                color: "#2a0f8a",
              }}
            >
              {kicker}
            </span>
            <span style={{ fontSize: 18, color: "rgba(15, 23, 42, 0.70)" }}>
              {locale === "pl" ? "Projekt" : "Project"}
            </span>
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 760,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 720,
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 30,
              color: "rgba(15, 23, 42, 0.72)",
              maxWidth: 720,
              lineHeight: 1.22,
            }}
          >
            {subtitle}
          </div>

          {categories.length > 0 && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {categories.map((category) => (
                <span
                  key={category}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "999px",
                    background: "rgba(255, 255, 255, 0.66)",
                    border: "1px solid rgba(15, 23, 42, 0.10)",
                    fontSize: 16,
                    textTransform: "capitalize",
                    color: "rgba(15, 23, 42, 0.75)",
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          <div
            style={{
              marginTop: 8,
              fontSize: 18,
              color: "rgba(15, 23, 42, 0.55)",
            }}
          >
            MICHALGACKA.COM
          </div>
        </div>

        <div
          style={{
            position: "relative",
            width: "46%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              width: "460px",
              height: "460px",
              padding: "14px",
              borderRadius: "32px",
              background: "rgba(255, 255, 255, 0.66)",
              border: "1px solid rgba(15, 23, 42, 0.10)",
              boxShadow: "0 26px 70px rgba(15, 23, 42, 0.16)",
              backdropFilter: "blur(16px)",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "22px",
                overflow: "hidden",
                background:
                  "linear-gradient(135deg, rgba(79, 70, 229, 0.10), rgba(155, 0, 189, 0.06))",
                border: "1px solid rgba(15, 23, 42, 0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {projectImage ? (
                <img
                  src={projectImage}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
