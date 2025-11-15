import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  const body = await request.json();

  if (!session) {
    return Response.json({ message: "No session" }, { status: 401 });
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
