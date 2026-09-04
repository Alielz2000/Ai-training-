import { COUNTRIES } from "@/lib/data/countries";
import { NEIGHBORHOODS } from "@/lib/data/neighborhoods";
import type { VoteRow } from "@/components/BeirutMap";

export default function ResultsTable({ votes }: { votes: VoteRow[] }) {
  const lookup = new Map<string, number>();
  for (const v of votes) {
    lookup.set(`${v.neighborhood}|${v.country}`, v.count);
  }

  const neighborhoodTotals = NEIGHBORHOODS.map((n) => {
    const total = COUNTRIES.reduce(
      (sum, c) => sum + (lookup.get(`${n}|${c.name}`) ?? 0),
      0
    );
    return { name: n, total };
  })
    .filter((n) => n.total > 0)
    .sort((a, b) => b.total - a.total);

  if (neighborhoodTotals.length === 0) {
    return <p className="empty-state">No votes yet — be the first.</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Neighborhood</th>
            {COUNTRIES.map((c) => (
              <th key={c.name}>{c.name}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {neighborhoodTotals.map(({ name, total }) => (
            <tr key={name}>
              <td>{name}</td>
              {COUNTRIES.map((c) => (
                <td key={c.name}>{lookup.get(`${name}|${c.name}`) ?? 0}</td>
              ))}
              <td className="total-cell">{total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
