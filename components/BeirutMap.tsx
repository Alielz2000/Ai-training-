"use client";

import { useState } from "react";
import {
  NEIGHBORHOOD_LAYOUT,
  getCellRect,
  MAP_WIDTH,
  MAP_HEIGHT,
} from "@/lib/data/neighborhoods";
import { COUNTRIES, NO_VOTES_COLOR } from "@/lib/data/countries";

export type VoteRow = { country: string; neighborhood: string; count: number };

type Breakdown = { top: { country: string; count: number }; total: number; breakdown: { country: string; count: number }[] };

function wrapLabel(name: string): string[] {
  if (name.length <= 14) return [name];
  const words = name.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function colorFor(countryName: string) {
  return COUNTRIES.find((c) => c.name === countryName)?.color ?? NO_VOTES_COLOR;
}

export default function BeirutMap({ votes }: { votes: VoteRow[] }) {
  const [active, setActive] = useState<string | null>(null);

  const byNeighborhood = new Map<string, { country: string; count: number }[]>();
  for (const v of votes) {
    const list = byNeighborhood.get(v.neighborhood) ?? [];
    list.push({ country: v.country, count: v.count });
    byNeighborhood.set(v.neighborhood, list);
  }

  function getDominant(name: string): Breakdown | null {
    const list = byNeighborhood.get(name) ?? [];
    if (list.length === 0) return null;
    const sorted = [...list].sort((a, b) => b.count - a.count);
    const total = list.reduce((sum, v) => sum + v.count, 0);
    return { top: sorted[0], total, breakdown: sorted };
  }

  const activeData = active ? getDominant(active) : null;

  return (
    <div className="map-wrap">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        role="img"
        aria-label="Stylized map of Beirut neighborhoods, colored by the most common country of origin reported for that area"
        className="map-svg"
      >
        {NEIGHBORHOOD_LAYOUT.map(({ name, row, col }) => {
          const { x, y, width, height } = getCellRect(row, col);
          const data = getDominant(name);
          const fill = data ? colorFor(data.top.country) : NO_VOTES_COLOR;
          const isActive = active === name;
          const lines = wrapLabel(name);

          return (
            <g key={name}>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={10}
                fill={fill}
                stroke={isActive ? "#16243b" : "rgba(22,36,59,0.15)"}
                strokeWidth={isActive ? 3 : 1}
                onMouseEnter={() => setActive(name)}
                onFocus={() => setActive(name)}
                onClick={() => setActive(name)}
                tabIndex={0}
                style={{ cursor: "pointer" }}
              />
              <text
                x={x + width / 2}
                y={y + height / 2}
                textAnchor="middle"
                className="map-label"
              >
                {lines.map((line, i) => (
                  <tspan
                    key={i}
                    x={x + width / 2}
                    dy={i === 0 ? `${-(lines.length - 1) * 0.6}em` : "1.2em"}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>

      {activeData && active && (
        <div className="map-tooltip">
          <strong>{active}</strong>
          <span className="map-tooltip-total">
            {activeData.total} vote{activeData.total !== 1 ? "s" : ""}
          </span>
          <ul>
            {activeData.breakdown.map((b) => (
              <li key={b.country}>
                <span className="dot" style={{ background: colorFor(b.country) }} />
                {b.country}: {b.count}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="legend">
        {COUNTRIES.map((c) => (
          <div key={c.name} className="legend-item">
            <span className="dot" style={{ background: c.color }} />
            {c.name}
          </div>
        ))}
        <div className="legend-item">
          <span className="dot" style={{ background: NO_VOTES_COLOR }} />
          No votes yet
        </div>
      </div>
    </div>
  );
}
