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
  const siteContent = getSiteContent(locale);
  const kicker = "Portfolio";

  const featured = [];
  for (const entry of portfolioItems) {
    if (featured.length >= 4) break;
    if (!entry?.cover) continue;
    featured.push(entry);
  }
  for (const entry of portfolioItems) {
    if (featured.length >= 4) break;
    if (featured.some((e) => e.slug === entry.slug)) continue;
    featured.push(entry);
  }

  const imagePaths = featured.map((entry) => {
    const data = entry?.i18n?.[locale] || entry?.i18n?.en;
    return data?.heroImage || data?.thumbnail || null;
  });

  const gridImages = await Promise.all(
    imagePaths.map((path) => (path ? fetchPublicImageArrayBuffer(path) : null))
  );

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
          background: OG_BACKDROPS.list,
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
            width: "56%",
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
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                fontWeight: 650,
                color: "#2a0f8a",
              }}
            >
              {kicker}
            </span>
          </div>

          <div
            style={{
              fontSize: 74,
              fontWeight: 760,
              lineHeight: 1.03,
              letterSpacing: "-0.02em",
            }}
          >
            {siteContent.name}
          </div>

          <div
            style={{
              fontSize: 34,
              color: "rgba(15, 23, 42, 0.72)",
              maxWidth: 720,
              lineHeight: 1.2,
            }}
          >
            {siteContent.title}
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
            width: "44%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              padding: "14px",
              borderRadius: "28px",
              background: "rgba(255, 255, 255, 0.66)",
              border: "1px solid rgba(15, 23, 42, 0.10)",
              boxShadow: "0 22px 60px rgba(15, 23, 42, 0.14)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ display: "flex", gap: "14px" }}>
              {gridImages.slice(0, 2).map((img, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "196px",
                    height: "196px",
                    borderRadius: "18px",
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg, rgba(79, 70, 229, 0.10), rgba(155, 0, 189, 0.06))",
                    border: "1px solid rgba(15, 23, 42, 0.10)",
                    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "14px" }}>
              {gridImages.slice(2, 4).map((img, idx) => (
                <div
                  key={idx + 2}
                  style={{
                    width: "196px",
                    height: "196px",
                    borderRadius: "18px",
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg, rgba(79, 70, 229, 0.10), rgba(155, 0, 189, 0.06))",
                    border: "1px solid rgba(15, 23, 42, 0.10)",
                    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
