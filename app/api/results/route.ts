import { NextResponse } from "next/server";
import db, { ensureTable } from "@/lib/db";

export async function GET() {
  try {
    await ensureTable();
    const result = await db.execute(
      "SELECT country, neighborhood, COUNT(*) as count FROM votes GROUP BY country, neighborhood"
    );

    const votes = result.rows.map((r) => ({
      country: String(r.country),
      neighborhood: String(r.neighborhood),
      count: Number(r.count),
    }));

    return NextResponse.json({ votes });
  } catch (err) {
    console.error("results error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
