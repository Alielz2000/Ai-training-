import { NEIGHBORHOODS } from "@/lib/data/neighborhoods";
import type { VoteRow } from "@/components/BeirutMap";

export default function ResultsTable({ votes }: { votes: VoteRow[] }) {
  const lookup = new Map<string, number>();
  for (const v of votes) {
    lookup.set(v.neighborhood, v.count);
  }

  const rows = NEIGHBORHOODS.map((n) => ({
    name: n,
    count: lookup.get(n) ?? 0,
  }))
    .filter((n) => n.count > 0)
    .sort((a, b) => b.count - a.count);

  if (rows.length === 0) {
    return <p className="empty-state">No votes yet — be the first.</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Neighborhood</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ name, count }) => (
            <tr key={name}>
              <td>{name}</td>
              <td className="total-cell">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
