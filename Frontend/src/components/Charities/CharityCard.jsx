// src/components/charities/CharityCard.jsx

export default function CharityCard({
  name,
  description,
  image,
  tags = [],
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]">
      {/* Image */}
      <div className="relative h-56 overflow-hidden sm:h-64">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1326] via-[#0B1326]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-emerald-400">
          {name}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
          {description}
        </p>

        {/* Learn More */}
        <button
          className="mt-6 flex items-center gap-2 font-medium text-emerald-400 transition-all duration-300 group-hover:gap-3"
        >
          Learn More
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
}