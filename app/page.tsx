"use client";

import { useEffect, useState, useCallback } from "react";
import VoteForm from "@/components/VoteForm";
import BeirutMap, { type VoteRow } from "@/components/BeirutMap";
import ResultsTable from "@/components/ResultsTable";

export default function Home() {
  const [votes, setVotes] = useState<VoteRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/results");
      const data = await res.json();
      setVotes(data.votes ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadResults();
  }, [loadResults]);

  return (
    <main className="page">
      <header className="hero">
        <h1>Where in Beirut are you from — and where do you live now?</h1>
        <p>
          A quick, informal class poll. Pick your country of origin and your
          neighborhood, and watch the city fill in.
        </p>
      </header>

      <section className="vote-section">
        <VoteForm onVoted={loadResults} />
      </section>

      <section className="results-section">
        <div className="results-header">
          <h2>Live results</h2>
          <button className="refresh-btn" onClick={loadResults} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
        <BeirutMap votes={votes} />
        <ResultsTable votes={votes} />
      </section>
    </main>
  );
}
