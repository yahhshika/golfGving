// src/components/admin/draw/DrawHeader.jsx

import { useState } from "react";
import { FaPlay, FaSpinner } from "react-icons/fa";
import api from "../../api/axios";
import { toast } from "react-toastify";
export default function DrawHeader({setDraw}) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [useAlgorithm, setUseAlgorithm] = useState(false);

  const handleSimulation = async() => {
    if (isSimulating) return;
    setIsSimulating(true);
    // Replace this with your API call later
    try{
      let url = "/admin/draw";
      if(useAlgorithm){
        url = url + "/algorithm"
      }else{
        url = url + "/random"
      }
      const response = await api.post(url);
      console.log(response.data)
      
      setTimeout(() => {
        setIsSimulating(false);
        if(response?.data){
          setDraw(response.data.draw);
        }
        toast.info("Now latest draw is under your simulation")
      }, 1200);

    }catch(err){
      console.log(err);
      console.log(err.response);
      
    }
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
          <div className="mb-6 flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium transition ${
                !useAlgorithm ? "text-emerald-400" : "text-slate-500"
              }`}
            >
              Random Draw
            </span>

            <button
              type="button"
              onClick={() => setUseAlgorithm(!useAlgorithm)}
              className={`relative h-7 w-14 rounded-full transition duration-300 ${
                useAlgorithm ? "bg-emerald-500" : "bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                  useAlgorithm ? "left-8" : "left-1"
                }`}
              />
            </button>

            <span
              className={`text-sm font-medium transition ${
                useAlgorithm ? "text-emerald-400" : "text-slate-500"
              }`}
            >
              Algorithmic Draw
            </span>
          </div>
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