import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/satchel/auth-config";
import { getPlayerInventory } from "@/lib/satchel/henrikdev";

export async function GET(_req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const puuid = session.user.puuid;
  const accessToken = session.accessToken;

  if (!puuid || !accessToken) {
    return NextResponse.json({ error: "Missing session data" }, { status: 401 });
  }

  try {
    const inventory = await getPlayerInventory("eu", puuid, accessToken);
    return NextResponse.json(inventory);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
