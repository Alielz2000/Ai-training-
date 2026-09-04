"use client";

import { useState, type FormEvent } from "react";
import { NEIGHBORHOODS } from "@/lib/data/neighborhoods";

type Status = "idle" | "submitting" | "done" | "error";

export default function VoteForm({ onVoted }: { onVoted: () => void }) {
  const [neighborhood, setNeighborhood] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!neighborhood) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ neighborhood }),
      });
      if (!res.ok) throw new Error("Vote failed");

      setStatus("done");
      setNeighborhood("");
      onVoted();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="vote-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="neighborhood">Where in Beirut do you live?</label>
        <select
          id="neighborhood"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose a neighborhood
          </option>
          {NEIGHBORHOODS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Vote"}
      </button>

      {status === "done" && (
        <p className="form-msg success">Thanks — your vote's on the map.</p>
      )}
      {status === "error" && (
        <p className="form-msg error">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
