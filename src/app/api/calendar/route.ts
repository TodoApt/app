import { NextResponse } from "next/server";
import { getTaskEvents } from "@/app/lib/data";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await getTaskEvents({ start, end });

  return NextResponse.json(results);
}
