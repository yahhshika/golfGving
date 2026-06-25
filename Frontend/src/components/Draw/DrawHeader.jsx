// src/components/admin/draw/DrawHeader.jsx

import { useState } from "react";
import { FaPlay, FaSpinner } from "react-icons/fa";

export default function DrawHeader() {
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);

    // Replace this with your API call later
    setTimeout(() => {
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <>
      {/* Heading */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Draw Administration
        </h1>

        <p className="max-w-3xl text-sm text-slate-400 md:text-base">
          Simulate results, audit winner match types, and publish official
          draws to the blockchain.
        </p>
      </section>

      {/* Simulation Card */}
      <section className="rounded-2xl border border-emerald-500/20 border-dashed bg-white/5 p-8 backdrop-blur-md shadow-lg">
        <div className="flex flex-col items-center justify-center text-center">
          <button
            onClick={handleSimulation}
            disabled={isSimulating}
            className="group flex items-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-black shadow-lg transition-all duration-300 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSimulating ? (
              <>
                <FaSpinner className="animate-spin text-xl" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <FaPlay className="transition-transform duration-300 group-hover:translate-x-1" />
                <span>Press to Simulate a Draw</span>
              </>
            )}
          </button>

          <p className="mt-5 text-sm italic text-slate-400">
            Simulated results will be shown below for verification.
          </p>
        </div>
      </section>
    </>
  );
}