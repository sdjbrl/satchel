import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/satchel/auth-config";
import { getPlayerProfile } from "@/lib/satchel/henrikdev";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const name = searchParams.get("name");
  const tag = searchParams.get("tag");

  const VALID_REGIONS = ["eu", "na", "ap", "kr"] as const;
  type Region = (typeof VALID_REGIONS)[number];
  const rawRegion = searchParams.get("region") ?? "eu";
  const region: Region = (VALID_REGIONS as readonly string[]).includes(rawRegion)
    ? (rawRegion as Region)
    : "eu";

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
