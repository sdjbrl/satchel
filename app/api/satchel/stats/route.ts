import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/satchel/auth-config";
import { getPlayerProfile } from "@/lib/satchel/henrikdev";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const tag = searchParams.get("tag");
  const region = (searchParams.get("region") ?? "eu") as "eu" | "na" | "ap" | "kr";

  if (!name || !tag) {
    return NextResponse.json({ error: "Missing name or tag" }, { status: 400 });
  }

  try {
    const profile = await getPlayerProfile(region, name, tag);
    return NextResponse.json(profile);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
