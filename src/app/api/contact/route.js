import { NextResponse } from "next/server";

export async function GET() {
  // Email is only revealed server-side, not in client bundle
  const email = "michalgacka@gmail.com";
  
  return NextResponse.json({ email });
}
