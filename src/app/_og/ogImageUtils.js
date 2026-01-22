import { headers } from "next/headers";

async function unwrapParams(params) {
  if (!params) return null;
  if (typeof params?.then === "function") return await params;
  return params;
}

export async function getLocaleFromParams(params) {
  const resolved = await unwrapParams(params);
  return resolved?.locale === "pl" ? "pl" : "en";
}

export async function getOriginFromRequestHeaders() {
  const headerStore = await headers();

  const forwardedProto = headerStore.get("x-forwarded-proto");
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost || headerStore.get("host");

  const protocol =
    forwardedProto || (host && host.includes("localhost") ? "http" : "https");

  if (!host) return "http://localhost:3000";
  return `${protocol}://${host}`;
}

export async function fetchPublicImageArrayBuffer(pathname) {
  try {
    const origin = await getOriginFromRequestHeaders();
    const fallbackExts = [".png", ".jpg", ".jpeg"];

    if (pathname.endsWith(".webp")) {
      for (const ext of fallbackExts) {
        const fallbackPath = pathname.replace(/\.webp$/i, ext);
        const fallbackUrl = new URL(fallbackPath, origin);
        const fallbackRes = await fetch(fallbackUrl);
        if (fallbackRes.ok) return await fallbackRes.arrayBuffer();
      }
    }

    const url = new URL(pathname, origin);
    const res = await fetch(url);
    const contentType = res.headers.get("content-type") || "";
    if (res.ok && !contentType.includes("image/webp")) {
      return await res.arrayBuffer();
    }

    if (pathname.endsWith(".webp")) {
      for (const ext of fallbackExts) {
        const fallbackPath = pathname.replace(/\.webp$/i, ext);
        const fallbackUrl = new URL(fallbackPath, origin);
        const fallbackRes = await fetch(fallbackUrl);
        if (fallbackRes.ok) return await fallbackRes.arrayBuffer();
      }
    }

    return null;
  } catch {
    return null;
  }
}

const BASE_OVERLAY =
  "linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.52))";

export const OG_BACKDROPS = {
  detail: [
    BASE_OVERLAY,
    "radial-gradient(circle at 12% 10%, rgba(79, 70, 229, 0.14), transparent 56%)",
    "radial-gradient(circle at 92% 18%, rgba(155, 0, 189, 0.10), transparent 58%)",
    "radial-gradient(circle at 86% 86%, rgba(34, 211, 238, 0.08), transparent 56%)",
    "repeating-linear-gradient(135deg, rgba(15, 23, 42, 0.05) 0px, rgba(15, 23, 42, 0.05) 1px, transparent 1px, transparent 14px)",
    "repeating-linear-gradient(45deg, rgba(155, 0, 189, 0.03) 0px, rgba(155, 0, 189, 0.03) 1px, transparent 1px, transparent 18px)",
  ].join(","),
  list: [
    "linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.56))",
    "radial-gradient(circle at 18% 12%, rgba(14, 165, 233, 0.10), transparent 60%)",
    "radial-gradient(circle at 88% 22%, rgba(79, 70, 229, 0.10), transparent 62%)",
    "radial-gradient(circle at 76% 84%, rgba(155, 0, 189, 0.06), transparent 62%)",
    "repeating-linear-gradient(135deg, rgba(15, 23, 42, 0.045) 0px, rgba(15, 23, 42, 0.045) 1px, transparent 1px, transparent 16px)",
    "repeating-linear-gradient(45deg, rgba(79, 70, 229, 0.02) 0px, rgba(79, 70, 229, 0.02) 1px, transparent 1px, transparent 22px)",
  ].join(","),
  me: [
    "linear-gradient(180deg, rgba(255, 255, 255, 0.80), rgba(255, 255, 255, 0.54))",
    "radial-gradient(circle at 14% 8%, rgba(155, 0, 189, 0.08), transparent 58%)",
    "radial-gradient(circle at 86% 24%, rgba(79, 70, 229, 0.11), transparent 62%)",
    "radial-gradient(circle at 78% 86%, rgba(34, 211, 238, 0.08), transparent 60%)",
    "repeating-linear-gradient(135deg, rgba(15, 23, 42, 0.05) 0px, rgba(15, 23, 42, 0.05) 1px, transparent 1px, transparent 18px)",
    "repeating-linear-gradient(45deg, rgba(34, 211, 238, 0.02) 0px, rgba(34, 211, 238, 0.02) 1px, transparent 1px, transparent 24px)",
  ].join(","),
};
