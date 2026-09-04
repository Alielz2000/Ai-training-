import { NextResponse } from "next/server";
import supabase from "@/lib/db";
import { NEIGHBORHOODS } from "@/lib/data/neighborhoods";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const neighborhood =
      typeof body?.neighborhood === "string" ? body.neighborhood : "";

    const validNeighborhood = NEIGHBORHOODS.includes(neighborhood);

    if (!validNeighborhood) {
      return NextResponse.json({ error: "Invalid selection" }, { status: 400 });
    }

    const { error } = await supabase.from("votes").insert({ neighborhood });
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("vote error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
