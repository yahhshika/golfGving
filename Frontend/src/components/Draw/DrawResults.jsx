// src/components/admin/draw/DrawResults.jsx

import DrawResultTable from "./DrawResultTable";
import SmallCard from "./SmallCard";
import PoolShares from "./PoolShares";

export default function DrawResults({draw}) {
  // Dummy data (replace with API response later)
  // const drawNumbers = [6, 18, 12, 4, 44];
  const colors = ["text-indigo-300","text-emerald-400","text-amber-400","text-white"]
  // const winners = [
  //   {
  //     id: 1,
  //     name: "Alister Mackenzie",
  //     matchType: "Match 5",
  //     prize: 1400,
  //   },
  //   {
  //     id: 2,
  //     name: "Ben Hogan",
  //     matchType: "Match 4",
  //     prize: 1600,
  //   },
  //   {
  //     id: 3,
  //     name: "Old Tom Morris",
  //     matchType: "Match 3",
  //     prize: 1000,
  //   },
  // ];

  // const stats = [
  //   {
  //     heading: "Match 3",
  //     result: 4,
  //     color: "text-indigo-300",
  //   },
  //   {
  //     heading: "Match 4",
  //     result: 2,
  //     color: "text-emerald-400",
  //   },
  //   {
  //     heading: "Match 5",
  //     result: 0,
  //     color: "text-amber-400",
  //   },
  //   {
  //     heading: "Rollover",
  //     result: "$1,600",
  //     color: "text-white",
  //     highlight: true,
  //   },
  // ];

  return (
    <section className="space-y-8">
      {/* Draw Result Table */}
      <DrawResultTable
        drawNumbers={draw?.draw|| []}
        winners={draw?.winners || []}
        type={draw?.type || ""}
        status={draw?.status || ""}
      />

      {/* Match Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[3,4,5,"rollOver"].map((matchNum,ind)=>{
          let currMatch = (matchNum!=="rollOver")? `match${matchNum}`:"Roll Over";
          let highlight = matchNum==="rollOver";
          return <SmallCard
            key={ind}
            heading={currMatch}
            result={(matchNum!=="rollOver"?draw?.[currMatch]: draw?.
rollOverAmount)}
            color={colors[ind]}
            highlight={highlight}
          />
        })}
        {/* {stats.map((card) => (
        ))} */}
      </div>

      {/* Pool Shares */}
      <PoolShares draw={draw} />
    </section>
  );
}