// src/components/subscription/SubscriptionHeader.jsx

export default function SubscriptionHeader() {
  return (
    <section className="mb-8 sm:mb-10 lg:mb-12 text-center">
      {/* Badge */}
      <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
        Emerald Zenith Membership
      </span>

      {/* Heading */}
      <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
        Elevate Your Impact
      </h1>

      {/* Description */}
      <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-400">
        Join an exclusive circle of golfers committed to transforming
        lives through the sport they love.
      </p>
    </section>
  );
}