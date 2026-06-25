import { FaTrophy } from "react-icons/fa";

export default function UserResult() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-white/5 backdrop-blur-xl">

      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <div className="p-8 md:p-12 text-center">

        <FaTrophy className="mx-auto text-5xl text-yellow-400 animate-bounce mb-5" />

        <h1 className="text-3xl md:text-5xl font-bold">
          Your Result
        </h1>

        <h2 className="mt-4 text-2xl md:text-4xl font-extrabold uppercase tracking-widest bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 bg-clip-text text-transparent">
          Yay!! You Won ₹30,000
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-3">

          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
            LEVEL : PRESTIGE
          </span>

          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            CHARITY MATCH : ₹3,000
          </span>

        </div>

      </div>
    </section>
  );
}