const LIVE_LABELS = ["live", "website", "strona", "site"];

export const isLivePreviewLink = (link) => {
  const label = (link?.label || "").toLowerCase();
  if (!link?.href) return false;
  if (link?.preview === true) return true;
  if (link?.preview === false) return false;
  return LIVE_LABELS.some((token) => label.includes(token));
};

export const getLivePreviewLink = (links = []) =>
  (links || []).find(isLivePreviewLink);

export const isReportPreviewLink = (link) => {
  const href = (link?.href || "").toLowerCase();
  if (!href) return false;

  return href.includes("drive.google.com") || href.includes("docs.google.com");
};

export const getEmbedPreviewUrl = (href) => {
  if (!href) return href;

  try {
    const url = new URL(href);
    const host = url.hostname.toLowerCase();

    if (host === "drive.google.com") {
      const parts = url.pathname.split("/").filter(Boolean);

      // https://drive.google.com/file/d/<id>/view?...
      // https://drive.google.com/file/d/<id>/preview?...
      if (parts[0] === "file" && parts[1] === "d" && parts[2]) {
        const id = parts[2];
        url.pathname = `/file/d/${id}/preview`;
        return url.toString();
      }

      // https://drive.google.com/open?id=<id>&...
      if (parts[0] === "open") {
        const id = url.searchParams.get("id");
        if (id) {
          const next = new URL(`https://drive.google.com/file/d/${id}/preview`);
          url.searchParams.forEach((value, key) => {
            if (key === "id") return;
            next.searchParams.set(key, value);
          });
          return next.toString();
        }
      }
    }

    if (host === "docs.google.com") {
      // Common shapes:
      // - /document/d/<id>/edit?...
      // - /spreadsheets/d/<id>/edit?...
      // - /presentation/d/<id>/edit?...
      const match = url.pathname.match(
        /^\/(document|spreadsheets|presentation)\/d\/([^/]+)/,
      );
      if (match) {
        const type = match[1];
        const id = match[2];
        url.pathname = `/${type}/d/${id}/preview`;
        return url.toString();
      }
    }

    return href;
  } catch {
    return href;
  }
};

const IFRAME_ALLOWLIST = {
  talkling: new Set(["talkling.app"]),
  soilsense: new Set(["app.soilsense.io", "staging.soilsense.io"]),
  "instytut-relacyjny": new Set([
    "www.instytutrelacyjny.pl",
    "instytutrelacyjny.pl",
  ]),
  covid19pink: new Set(["covid19.pink", "www.covid19.pink"]),
};

export const isIframeLivePreviewAllowed = ({ slug, href }) => {
  if (!slug || !href) return false;

  const allowedHosts = IFRAME_ALLOWLIST[slug];
  if (!allowedHosts) return false;

  try {
    const host = new URL(href).hostname;
    return allowedHosts.has(host);
  } catch {
    return false;
  }
};
