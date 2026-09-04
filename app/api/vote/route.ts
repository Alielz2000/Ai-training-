import { NextResponse } from "next/server";
import db, { ensureTable } from "@/lib/db";
import { COUNTRIES } from "@/lib/data/countries";
import { NEIGHBORHOODS } from "@/lib/data/neighborhoods";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const country = typeof body?.country === "string" ? body.country : "";
    const neighborhood =
      typeof body?.neighborhood === "string" ? body.neighborhood : "";

    const validCountry = COUNTRIES.some((c) => c.name === country);
    const validNeighborhood = NEIGHBORHOODS.includes(neighborhood);

    if (!validCountry || !validNeighborhood) {
      return NextResponse.json({ error: "Invalid selection" }, { status: 400 });
    }

    await ensureTable();
    await db.execute({
      sql: "INSERT INTO votes (country, neighborhood) VALUES (?, ?)",
      args: [country, neighborhood],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("vote error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
