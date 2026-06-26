// src/components/admin/draw/PoolShares.jsx

import { FaCloudUploadAlt } from "react-icons/fa";
import api from "../../api/axios";
import { toast } from "react-toastify";
export default function PoolShares({draw, fetchDraw}) {
  // Dummy data (replace with API response later)
  const totalPool = draw?.poolShare3Match + draw?.poolShare4Match + draw?.poolShare5Match || 0;
 
  const shares = [
    {
      label: "Match 3",
      amount: draw?.poolShare3Match,
      color: "bg-indigo-300",
    },
    {
      label: "Match 4",
      amount: draw?.poolShare4Match,
      color: "bg-emerald-400",
    },
    {
      label: "Match 5",
      amount: draw?.poolShare5Match,
      color: "bg-amber-400",
    },
  ]; 

  const handleDrawPublish = async()=>{
    try{
      const response = await api.patch("/admin/draw/publish");
      if(response?.data?.message){
        toast.success(response.data.message);
      }
      await fetchDraw();
    }catch(err){
      console.log("error in Draw publish frontend");
      // console.log(err);
      if(err.response?.data?.message){
        toast.error(err.response.data.message);
      }
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg">
      {/* Heading */}
      <h2 className="mb-8 text-2xl font-semibold text-white">
        Pool Shares
      </h2>

      {/* Pie Chart */}
      <div className="relative mx-auto flex w-full max-w-sm items-center justify-center">
        <svg
          className="-rotate-90 h-72 w-72"
          viewBox="0 0 100 100"
        >
          {/* Match 3 */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#c0c1ff"
            strokeWidth="20"
            strokeDasharray="25 75"
            className="transition-all duration-300 hover:scale-105"
          />

          {/* Match 4 */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#4ade80"
            strokeWidth="20"
            strokeDasharray="40 60"
            strokeDashoffset="-25"
            className="transition-all duration-300 hover:scale-105"
          />

          {/* Match 5 */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#fbbf24"
            strokeWidth="20"
            strokeDasharray="35 65"
            strokeDashoffset="-65"
            className="transition-all cursor-pointer duration-300 hover:brightness-125"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h3 className="text-3xl font-bold text-white">
            ${totalPool.toLocaleString()}
          </h3>

          <p className="text-sm text-slate-400">
            Total Pool
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 space-y-4">
        {shares.map((share) => (
          <div
            key={share?.label}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full ${share?.color}`}
              />

              <span className="text-slate-300">
                {share?.label}
              </span>
            </div>

            <span className="font-semibold text-white">
              $
              {share?.amount?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Publish Button */}
      <div className="mt-10 space-y-4">
        <button onClick={handleDrawPublish}
          className="
            group
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-emerald-400
            py-4
            font-semibold
            text-emerald-400
            transition-all
            duration-300
            hover:bg-emerald-500/10
            hover:shadow-lg
            hover:shadow-emerald-500/10
            active:scale-95
          "
        >
          <FaCloudUploadAlt className="text-xl transition-transform duration-500 group-hover:rotate-180" />

          Publish the Draw
        </button>

        <p className="text-center text-sm text-slate-400">
          Action is final. Publishing will distribute funds to charity wallets
          and winners instantly.
        </p>
      </div>
    </div>
  );
}