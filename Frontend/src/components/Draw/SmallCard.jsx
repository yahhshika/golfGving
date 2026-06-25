// src/components/admin/draw/SmallCard.jsx

export default function SmallCard({
  heading,
  result,
  color = "text-white",
  highlight = false,
}) {
  const textSize =
  String(result).length > 12
    ? "text-base"
    : String(result).length > 8
    ? "text-lg"
    : "text-xl";

  if(heading === "Roll Over" && result != null) {
    result = Number(result).toFixed(2);
  }

  if(
    result === null ||
    result === undefined ||
    result === "" ||
    Number.isNaN(Number(result))
  ) {
    result = "-";
  }
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
        className={`${textSize} font-bold transition-transform duration-300 group-hover:scale-110 ${color}`}
      >
        {result}
      </h3>
    </div>
  );
}