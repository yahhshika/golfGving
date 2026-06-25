import React from "react";

export default function WinningHistory({ winnings = [] }) {
  // console.log("winnings")
  // console.log(winnings);
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-800 p-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white">
          Winning History
        </h2>

        <span className="w-fit rounded-full bg-slate-800 px-4 py-1 text-sm text-emerald-400">
          Recent Activity
        </span>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="border-b border-slate-800">
            <tr className="text-left">
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                Draw ID
              </th>

              <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                Match Type
              </th>

              <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                Prize
              </th>

              <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-slate-400">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {winnings.length ? (
              winnings.map((item) => {
                const prize =
                item?.matchType === "3-match"
                  ? 0.25 * item.prizeAmount
                  : item?.matchType === "4-match"
                  ? 0.35 *item.prizeAmount
                  : item?.matchType === "5-match"
                  ? 0.4 * item.prizeAmount
                  : null;
                return(
                <tr
                  key={item?._id}
                  className="border-b border-slate-800 transition hover:bg-slate-800/40"
                >
                  <td className="px-6 py-5 font-semibold text-yellow-400">
                    {item?.drawId || "-"}
                  </td>

                  <td className="px-6 py-5 text-white">
                    {item?.matchType || "not known"}
                  </td>

                  <td className="px-6 py-5 font-bold text-emerald-400">
                    ₹{prize !== null ? prize.toFixed(2) : "Not known"}
                  </td>

                  <td className="px-6 py-5 text-right text-slate-400">
                    {item?.updatedAt?.toString().split("T")[0] || "not known"}
                  </td>
                </tr>
              )})
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-slate-500"
                >
                  No winnings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 p-4 md:hidden">
        {winnings.length ? (
          winnings.map((item) => {
            const prize =
              item?.matchType === "3-match"
                ? 0.25 * item.prizeAmount
                : item?.matchType === "4-match"
                ? 0.35 *item.prizeAmount
                : item?.matchType === "5-match"
                ? 0.4 * item.prizeAmount
                : null;
            return (
            <div
              key={item._id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-yellow-400">
                  {item?.drawId}
                </h3>

                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                  Winner
                </span>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Match
                  </span>

                  <span className="text-white">
                    {item?.matchType || "-"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Prize
                  </span>

                  <span className="font-bold text-emerald-400">
                    ₹{prize !== null ? prize.toFixed(2) : "Not known"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Date
                  </span>

                  <span className="text-white">
                    {item?.updatedAt?.toString().split("T")[0] || "not known"}
                  </span>
                </div>
              </div>
            </div>
          )})
        ) : (
          <div className="py-10 text-center text-slate-500">
            No winnings yet.
          </div>
        )}
      </div>
    </div>
  );
}