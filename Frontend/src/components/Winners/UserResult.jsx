import { FaTrophy } from "react-icons/fa";
import { FaSadCry } from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../../contexts/user/UserContext";
export default function UserResult({winners}) {
  let {user} = useContext(UserContext);
  console.log("winners");
  console.log(winners);
  const winner = winners.find(
    (winner) => winner.userId?._id?.toString() === user?._id?.toString()
  );
  const prize =
  winner?.matchType === "3-match"
    ? 0.25 * winner.prizeAmount
    : winner?.matchType === "4-match"
    ? 0.35 * winner.prizeAmount
    : winner?.matchType === "5-match"
    ? 0.4 * winner.prizeAmount
    : null;
  
  return (
    <section className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-white/5 backdrop-blur-xl">
      
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <div className="p-8 md:p-12 text-center">
        {winner?
        <FaTrophy className="mx-auto text-5xl text-yellow-400 animate-bounce mb-5" />:
        <FaSadCry className="text-yellow-400 text-5xl mx-auto mb-5 animate-bounce" />
        
        }

        <h1 className="text-3xl md:text-5xl font-bold">
          Your Result
        </h1>

        <h2 className="mt-4 text-2xl md:text-4xl font-extrabold uppercase tracking-widest bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 bg-clip-text text-transparent">
          {winner?`Yay!! You Won ${prize || "not known"}`:"Sorry! Better Luck next time."}
         
        </h2>
        {winner && 
        
        
        <div className="mt-8 flex flex-wrap justify-center gap-3">

          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
            LEVEL : PRESTIGE
          </span>

          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            CHARITY MATCH : {winner?.matchType}
          </span>

        </div>
        }

      </div>
    </section>
  );
}