import { NextResponse } from "next/server";
import { getTaskEvents } from "@/app/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const results = await getTaskEvents({ start, end });

  return NextResponse.json(results);
}
