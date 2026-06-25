// src/components/admin/draw/DrawResultTable.jsx

export default function DrawResultTable({ drawNumbers, winners }) {
  const badgeColors = {
    "Match 3":
      "bg-indigo-500/10 text-indigo-300 border border-indigo-400/20",
    "Match 4":
      "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20",
    "Match 5":
      "bg-amber-500/10 text-amber-400 border border-amber-400/20",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-2xl font-semibold text-white">
          Draw Results
        </h2>

        {/* Draw Numbers */}
        <div className="flex flex-wrap gap-2">
          {drawNumbers.map((number, index) => (
            <span
              key={index}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500 text-sm font-bold text-black shadow transition-all duration-300 hover:scale-110"
            >
              {number}
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Winner Name
              </th>

              <th className="py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                Match Type
              </th>

              <th className="py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                Prize (USD)
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {winners.map((winner) => (
              <tr
                key={winner.id}
                className="transition-colors duration-300 hover:bg-white/5"
              >
                {/* Name */}
                <td className="whitespace-nowrap py-5 text-sm font-medium text-white md:text-base">
                  {winner.name}
                </td>

                {/* Match Type */}
                <td className="py-5 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold md:text-sm ${
                      badgeColors[winner.matchType]
                    }`}
                  >
                    {winner.matchType}
                  </span>
                </td>

                {/* Prize */}
                <td className="whitespace-nowrap py-5 text-right text-sm font-bold text-emerald-400 md:text-base">
                  $
                  {winner.prize.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}