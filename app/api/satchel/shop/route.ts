import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/satchel/auth-config";
import { getPlayerShop } from "@/lib/satchel/henrikdev";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const name = session.user.name ?? "";
  const tag = session.user.tag;
  const accessToken = session.accessToken;

  if (!accessToken) {
    return NextResponse.json({ error: "No access token in session" }, { status: 401 });
  }

  try {
    const shop = await getPlayerShop("eu", name, tag, accessToken);
    return NextResponse.json(shop);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
