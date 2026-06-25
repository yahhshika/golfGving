// src/components/charities/CharitiesHeader.jsx

export default function CharitiesHeader() {
  return (
    <section className="w-full">
      <div className="max-w-3xl">
        {/* Small Label */}
        <span className="inline-block rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
          Precision in Philanthropy
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
          Precision in{" "}
          <span className="text-emerald-400 drop-shadow-[0_0_18px_rgba(52,211,153,0.45)]">
            Giving
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg leading-8 text-slate-400">
          Discover and support high-impact charities dedicated to transforming
          lives through the power of sport, community, and innovation. Every
          ticket purchased contributes toward meaningful causes that create
          lasting impact. <br />
          (Please note that you can donate only once per-subscription)
        </p>

        {/* Decorative Line */}
        <div className="mt-10 h-[2px] w-28 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-transparent" />
      </div>
    </section>
  );
}