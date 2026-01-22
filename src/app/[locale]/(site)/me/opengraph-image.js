import { ImageResponse } from "next/og";
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
  const siteContent = getSiteContent(locale);

  let portraitPath = siteContent.about?.image?.src || "/images/me1.jpg";
  if (portraitPath && portraitPath.endsWith('.webp')) {
    portraitPath = "/images/me1.jpg";
  }
  const portrait = await fetchPublicImageArrayBuffer(portraitPath);

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
          background: OG_BACKDROPS.me,
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
            gap: "18px",
            width: "54%",
            paddingRight: "32px",
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
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                fontWeight: 650,
                color: "#2a0f8a",
              }}
            >
              {locale === "pl" ? "O mnie" : "About"}
            </span>
          </div>

          <div
            style={{
              fontSize: 70,
              fontWeight: 760,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
            }}
          >
            {siteContent.name}
          </div>

          <div
            style={{
              fontSize: 30,
              color: "rgba(15, 23, 42, 0.72)",
              maxWidth: 720,
              lineHeight: 1.22,
            }}
          >
            {locale === "pl" ? "Software Engineer" : "Software Engineer"}
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 18,
              color: "rgba(15, 23, 42, 0.50)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            michalgacka.com
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
              width: "420px",
              height: "420px",
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
              {portrait ? (
                <img
                  src={portrait}
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
