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

const IFRAME_ALLOWLIST = {
  talkling: new Set(["talkling.app"]),
  soilsense: new Set(["app.soilsense.io"]),
  "instytut-relacyjny": new Set(["www.instytutrelacyjny.pl", "instytutrelacyjny.pl"]),
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
