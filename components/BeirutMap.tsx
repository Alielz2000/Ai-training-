"use client";

import { useState } from "react";
import {
  NEIGHBORHOOD_LAYOUT,
  getCellRect,
  MAP_WIDTH,
  MAP_HEIGHT,
} from "@/lib/data/neighborhoods";

export type VoteRow = { neighborhood: string; count: number };

const NO_VOTES_COLOR = "#C9CDC9";
const MIN_VOTE_COLOR = "#CFE3E0";
const MAX_VOTE_COLOR = "#2E6F77";

function wrapLabel(name: string): string[] {
  if (name.length <= 14) return [name];
  const words = name.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function mixColors(from: string, to: string, t: number) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

export default function BeirutMap({ votes }: { votes: VoteRow[] }) {
  const [active, setActive] = useState<string | null>(null);

  const countByNeighborhood = new Map<string, number>();
  for (const v of votes) {
    countByNeighborhood.set(v.neighborhood, v.count);
  }

  const maxCount = Math.max(0, ...votes.map((v) => v.count));

  function colorFor(count: number) {
    if (count === 0 || maxCount === 0) return NO_VOTES_COLOR;
    return mixColors(MIN_VOTE_COLOR, MAX_VOTE_COLOR, count / maxCount);
  }

  return (
    <div className="map-wrap">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        role="img"
        aria-label="Stylized map of Beirut neighborhoods, shaded by how many people reported living there"
        className="map-svg"
      >
        {NEIGHBORHOOD_LAYOUT.map(({ name, row, col }) => {
          const { x, y, width, height } = getCellRect(row, col);
          const count = countByNeighborhood.get(name) ?? 0;
          const fill = colorFor(count);
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

      {active && (
        <div className="map-tooltip">
          <strong>{active}</strong>
          <span className="map-tooltip-total">
            {countByNeighborhood.get(active) ?? 0} vote
            {(countByNeighborhood.get(active) ?? 0) !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="legend">
        <div className="legend-scale">
          <span>Fewer votes</span>
          <span
            className="legend-gradient"
            style={{
              background: `linear-gradient(to right, ${MIN_VOTE_COLOR}, ${MAX_VOTE_COLOR})`,
            }}
          />
          <span>More votes</span>
        </div>
        <div className="legend-item">
          <span className="dot" style={{ background: NO_VOTES_COLOR }} />
          No votes yet
        </div>
      </div>
    </div>
  );
}
