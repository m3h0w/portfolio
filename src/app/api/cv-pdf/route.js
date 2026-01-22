import CvPdfDocument from "@/app/_pdf/CvPdfDocument";
import { getCv } from "@/data/cv";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getLocaleFromRequest(request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang");
  return lang === "pl" ? "pl" : "en";
}

function isInlineRequest(request) {
  const url = new URL(request.url);
  const inline = url.searchParams.get("inline");
  return inline === "1" || inline === "true";
}

function getFilename(locale) {
  return locale === "pl" ? "Michal-Gacka-CV-PL.pdf" : "Michal-Gacka-CV.pdf";
}

function isLocalhostHostname(hostname) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname === "::1"
  );
}

export async function GET(request) {
  const locale = getLocaleFromRequest(request);
  const cv = getCv();
  const hostname = new URL(request.url).hostname;
  const showPhone = isLocalhostHostname(hostname);

  const element = React.createElement(CvPdfDocument, { cv, locale, showPhone });
  const pdfBuffer = await renderToBuffer(element);

  const filename = getFilename(locale);
  const dispositionType = isInlineRequest(request) ? "inline" : "attachment";

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${dispositionType}; filename=\"${filename}\"`,
      "Cache-Control": "no-store",
    },
  });
}
