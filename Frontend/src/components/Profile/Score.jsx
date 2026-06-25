// src/components/Profile/Score.jsx

import { MdEdit } from "react-icons/md";

export default function Score({ score, onEdit }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900/70 p-4 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10">
      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-col items-center gap-3">
        <span className="text-3xl font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
          {score.score}
        </span>

        <button
          onClick={() => onEdit(score)}
          className="flex items-center gap-1 rounded-md border border-slate-700 px-3 py-1 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-400"
        >
          <MdEdit />
          Edit
        </button>
      </div>
    </div>
  );
}