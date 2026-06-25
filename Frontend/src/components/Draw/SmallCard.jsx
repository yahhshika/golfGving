// src/components/admin/draw/SmallCard.jsx

export default function SmallCard({
  heading,
  result,
  color = "text-white",
  highlight = false,
}) {
  return (
    <div
      className={`
        group rounded-2xl border border-white/10
        backdrop-blur-md shadow-lg
        p-5
        flex flex-col items-center justify-center
        text-center
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-emerald-500/10
        ${
          highlight
            ? "bg-emerald-500/10 border-emerald-400/20"
            : "bg-white/5"
        }
      `}
    >
      {/* Heading */}
      <p
        className={`mb-2 text-sm font-medium ${
          highlight ? "text-emerald-400" : "text-slate-400"
        }`}
      >
        {heading}
      </p>

      {/* Result */}
      <h3
        className={`text-3xl font-bold transition-transform duration-300 group-hover:scale-110 ${color}`}
      >
        {heading === "Roll Over"? Number(result).toFixed(2) : result}
      </h3>
    </div>
  );
}