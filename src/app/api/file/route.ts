import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`${process.env.API_URL}/file/presign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify({
      type: body.type,
    }),
  });

  const data = await response.json();

  return Response.json(data);
}
