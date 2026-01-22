import { NextResponse } from "next/server";

function getHostname(request: Request) {
  const host = request.headers.get("host") || "";
  // Handle IPv6 like "[::1]:3000"
  const trimmed = host.trim();
  if (trimmed.startsWith("[")) {
    const closing = trimmed.indexOf("]");
    if (closing !== -1) return trimmed.slice(1, closing);
  }
  return trimmed.split(":")[0];
}

function isLocalhost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

export function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const requestHeaders = new Headers(request.headers);

  // CV PDF endpoint is public.
  if (pathname === "/api/cv-pdf") {
    return NextResponse.next();
  }

  // Static assets and Next internals.
  const isStaticFile = /\.[a-zA-Z0-9]+$/.test(pathname);
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    isStaticFile
  ) {
    return NextResponse.next();
  }

  // CV routes are public.

  // Canonical URLs:
  // - EN has no prefix (/) but is served from internal /en via rewrite
  // - PL uses /pl
  // - /en is never canonical (redirect away)
  const isSocialImageRoute =
    pathname.includes("/opengraph-image-") || pathname.includes("/twitter-image-");

  if (isSocialImageRoute) {
    if (pathname === "/en" || pathname.startsWith("/en/")) {
      requestHeaders.set("x-locale", "en");
    }

    if (pathname === "/pl" || pathname.startsWith("/pl/")) {
      requestHeaders.set("x-locale", "pl");
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const targetPath = pathname === "/en" ? "/" : pathname.replace(/^\/en/, "");
    url.pathname = targetPath;
    return NextResponse.redirect(url);
  }

  if (pathname === "/") {
    requestHeaders.set("x-locale", "en");
    url.pathname = "/en";
    return NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
  }

  if (pathname === "/pl" || pathname.startsWith("/pl/")) {
    requestHeaders.set("x-locale", "pl");
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Any other path is EN.
  requestHeaders.set("x-locale", "en");
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/:path*"],
};
