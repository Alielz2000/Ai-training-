export type NeighborhoodCell = {
  name: string;
  row: number;
  col: number;
};

// This is a stylized, hand-arranged layout, not a survey-accurate map.
// Rows run roughly north (coast) to south; columns run roughly west to east.
export const NEIGHBORHOOD_LAYOUT: NeighborhoodCell[] = [
  { name: "Ain el Mreisseh", row: 0, col: 0 },
  { name: "Manara", row: 0, col: 1 },
  { name: "Downtown (Solidere)", row: 0, col: 2 },
  { name: "Gemmayze", row: 0, col: 3 },
  { name: "Bourj Hammoud", row: 0, col: 4 },

  { name: "Ras Beirut", row: 1, col: 0 },
  { name: "Hamra", row: 1, col: 1 },
  { name: "Zokak el Blat", row: 1, col: 2 },
  { name: "Mar Mikhael", row: 1, col: 3 },
  { name: "Sin el Fil", row: 1, col: 4 },

  { name: "Verdun", row: 2, col: 0 },
  { name: "Clemenceau", row: 2, col: 1 },
  { name: "Bachoura", row: 2, col: 2 },
  { name: "Sodeco", row: 2, col: 3 },
  { name: "Karm el Zeitoun", row: 2, col: 4 },

  { name: "Msaytbeh", row: 3, col: 0 },
  { name: "Basta", row: 3, col: 1 },
  { name: "Achrafieh", row: 3, col: 2 },
  { name: "Rmeil", row: 3, col: 3 },
  { name: "Corniche el Nahr", row: 3, col: 4 },

  { name: "Mazraa", row: 4, col: 0 },
  { name: "Tariq el Jdideh", row: 4, col: 1 },
  { name: "Badaro", row: 4, col: 2 },
  { name: "Furn el Chebbak", row: 4, col: 3 },
  { name: "Horsh Beirut / Tayouneh", row: 4, col: 4 },

  { name: "Sabra", row: 5, col: 0 },
  { name: "Shatila", row: 5, col: 1 },
  { name: "Dahieh (Bir Hassan)", row: 5, col: 2 },
];

export const NEIGHBORHOODS = NEIGHBORHOOD_LAYOUT.map((n) => n.name);

export const GRID = {
  cellW: 160,
  cellH: 110,
  gap: 14,
  offsetX: 20,
  offsetY: 20,
  cols: 5,
  rows: 6,
};

export function getCellRect(row: number, col: number) {
  const x = GRID.offsetX + col * (GRID.cellW + GRID.gap);
  const y = GRID.offsetY + row * (GRID.cellH + GRID.gap);
  return { x, y, width: GRID.cellW, height: GRID.cellH };
}

export const MAP_WIDTH =
  GRID.offsetX * 2 + GRID.cols * GRID.cellW + (GRID.cols - 1) * GRID.gap;
export const MAP_HEIGHT =
  GRID.offsetY * 2 + GRID.rows * GRID.cellH + (GRID.rows - 1) * GRID.gap;
