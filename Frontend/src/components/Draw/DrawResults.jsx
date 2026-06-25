// src/components/admin/draw/DrawResults.jsx

import DrawResultTable from "./DrawResultTable";
import SmallCard from "./SmallCard";
import PoolShares from "./PoolShares";

export default function DrawResults() {
  // Dummy data (replace with API response later)
  const drawNumbers = [6, 18, 12, 4, 44];

  const winners = [
    {
      id: 1,
      name: "Alister Mackenzie",
      matchType: "Match 5",
      prize: 1400,
    },
    {
      id: 2,
      name: "Ben Hogan",
      matchType: "Match 4",
      prize: 1600,
    },
    {
      id: 3,
      name: "Old Tom Morris",
      matchType: "Match 3",
      prize: 1000,
    },
  ];

  const stats = [
    {
      heading: "Match 3",
      result: 4,
      color: "text-indigo-300",
    },
    {
      heading: "Match 4",
      result: 2,
      color: "text-emerald-400",
    },
    {
      heading: "Match 5",
      result: 0,
      color: "text-amber-400",
    },
    {
      heading: "Rollover",
      result: "$1,600",
      color: "text-white",
      highlight: true,
    },
  ];

  return (
    <section className="space-y-8">
      {/* Draw Result Table */}
      <DrawResultTable
        drawNumbers={drawNumbers}
        winners={winners}
      />

      {/* Match Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((card) => (
          <SmallCard
            key={card.heading}
            heading={card.heading}
            result={card.result}
            color={card.color}
            highlight={card.highlight}
          />
        ))}
      </div>

      {/* Pool Shares */}
      <PoolShares />
    </section>
  );
}