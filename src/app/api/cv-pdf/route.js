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

export async function GET(request) {
  const locale = getLocaleFromRequest(request);
  const cv = getCv();

  const element = React.createElement(CvPdfDocument, { cv, locale });
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
