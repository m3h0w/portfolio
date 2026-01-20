import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const email = "michalgacka@gmail.com";

  return NextResponse.json(
    { email },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
