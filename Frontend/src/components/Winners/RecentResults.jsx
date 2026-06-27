// const winners = [
//   {
//     name: "Yashika",
//     type: "3-Match",
//     amount: "₹230,000",
//   },
//   {
//     name: "Alexander M.",
//     type: "4-Match",
//     amount: "₹15,000",
//   },
//   {
//     name: "Sophia R.",
//     type: "Grand Draw",
//     amount: "₹500,000",
//   },
//   {
//     name: "Liam K.",
//     type: "Bonus Ball",
//     amount: "₹2,500",
//   },
// ];

export default function RecentResults({winners=[]}) {
  return (
    <section>

      <h2 className="mb-6 text-3xl font-bold">
        Recent Results
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

        <table className="min-w-full">

          <thead className="border-b border-white/10">

            <tr className="text-left text-sm uppercase tracking-widest text-gray-400">

              <th className="px-6 py-4">
                Name
              </th>

              <th className="px-6 py-4">
                Match Type
              </th>

              <th className="px-6 py-4 text-right">
                Prize Amount
              </th>

            </tr>

          </thead>

          <tbody>
            {winners.length === 0 && 
  
              <p className="px-6 py-5 text-gray-400 italic">
                No Winners in the last draw
              </p>

          
            }
            {winners.map((winner,ind) => {
              
              // const prize =
              // winner?.matchType === "3-match"
              //   ? 0.25 * winner.prizeAmount
              //   : winner?.matchType === "4-match"
              //   ? 0.35 * winner.prizeAmount
              //   : winner?.matchType === "5-match"
              //   ? 0.4 * winner.prizeAmount
              //   : null;
  
              return (
              <tr
                key={ind}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 font-bold text-emerald-400">
                      {winner?.userId?.name[0]}
                    </div>

                    <span>{winner?.userId?.name}</span>

                  </div>

                </td>

                <td className="px-6 py-5 text-gray-400 italic">
                  {winner?.matchType || "not known"}
                </td>

                <td className="px-6 py-5 text-right font-bold text-yellow-400">
                  {winner?.prizeAmount? "₹"+ Number(winner.prizeAmount).toFixed(2) : "Not known"}
                </td>

              </tr>
            )})}

          </tbody>

        </table>

      </div>

    </section>
  );
}