import { NextResponse } from "next/server";
import supabase from "@/lib/db";

export async function GET() {
  try {
    const { data, error } = await supabase.from("votes").select("neighborhood");
    if (error) throw error;

    const counts = new Map<string, number>();
    for (const row of data ?? []) {
      counts.set(row.neighborhood, (counts.get(row.neighborhood) ?? 0) + 1);
    }

    const votes = Array.from(counts.entries()).map(([neighborhood, count]) => ({
      neighborhood,
      count,
    }));

    return NextResponse.json({ votes });
  } catch (err) {
    console.error("results error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
