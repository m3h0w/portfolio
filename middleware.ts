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

  const isCvRoute = pathname === "/cv" || pathname === "/pl/cv";
  const isCvPdfRoute = pathname === "/api/cv-pdf";

  if (!isCvRoute && !isCvPdfRoute) return NextResponse.next();

  const hostname = getHostname(request);
  const allow = process.env.NODE_ENV === "development" && isLocalhost(hostname);

  if (allow) return NextResponse.next();

  return new Response("Not Found", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export const config = {
  matcher: ["/cv", "/pl/cv", "/api/cv-pdf"],
};
