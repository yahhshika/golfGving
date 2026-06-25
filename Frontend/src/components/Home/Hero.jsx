import { FaArrowRight, FaAward } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1326] pb-24">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-emerald-400/15 blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-emerald-500/5 blur-[120px]" />

        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-cyan-400/5 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-6 text-center lg:px-10">
        {/* Badge */}

        <div className="mt-24 mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-white/5 px-5 py-2 backdrop-blur-xl">
          <FaAward className="text-sm text-emerald-400" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 md:text-sm">
            Precision Philanthropy
          </span>
        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-5xl font-bold leading-tight text-[#DAE2FD] sm:text-6xl lg:text-7xl">
          Every Swing Supports{" "}
          <span className="italic text-[#4EDEA3]">
            Global Change
          </span>
        </h1>

        {/* Description */}

        <p className="mt-8 max-w-3xl text-lg leading-8 text-[#BBCABF] sm:text-xl">
          The world's first luxury giveaway platform where your pursuit of
          winning fuels global charity missions. Every ticket contributes to
          real-world impact while giving you a chance to win unforgettable
          experiences.
        </p>

        {/* Buttons */}

        <div className="mt-12 flex w-full flex-col items-center justify-center gap-5 sm:w-auto sm:flex-row">
          <Link
            to="/charities"
            className="group flex items-center justify-center gap-3 rounded-xl bg-[#4EDEA3] px-8 py-4 text-lg font-semibold text-[#003824] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(78,222,163,0.35)]"
          >
            Enter the Draw

            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            to="/winners"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-[#DAE2FD] backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/10"
          >
            View Live Results
          </Link>
        </div>

        {/* Stats */}

        {/* <div className="mt-24 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4"> */}
        <div className="mt-24 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              value: "40%",
              label: "Donated",
            },
            {
              value: "15K+",
              label: "Participants",
            },
            {
              value: "₹2.5Cr",
              label: "Raised",
            },
            {
              value: "120+",
              label: "Charities",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-emerald-400/20"
            >
              <h2 className="text-3xl font-bold text-[#4EDEA3]">
                {item.value}
              </h2>

              <p className="mt-2 text-sm uppercase tracking-widest text-[#BBCABF]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}