// src/components/subscription/SubscriptionForm.jsx

import { useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdVolunteerActivism } from "react-icons/md";

export default function SubscriptionForm() {
  const [plan, setPlan] = useState("monthly");
  const [percentage, setPercentage] = useState(10);

  const prices = {
    monthly: 1000,
    yearly: 10000,
  };

  const charityAmount = useMemo(() => {
    return Math.round((prices[plan] * percentage) / 100);
  }, [plan, percentage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your API call
    console.log({
      plan,
      percentage,
      charityAmount,
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-5 sm:p-7 lg:p-10">
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Plan Selection */}
        <div>
          <label className="mb-4 block text-xs font-semibold uppercase tracking-widest text-slate-400">
            Select Frequency
          </label>

          <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/5 bg-[#111827] p-1.5">

            <button
              type="button"
              onClick={() => setPlan("monthly")}
              className={`rounded-lg py-3 px-4 transition-all duration-300 ${
                plan === "monthly"
                  ? "bg-emerald-400 text-slate-900 shadow-lg shadow-emerald-500/30"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="font-semibold">Monthly</span>
                <span className="text-sm opacity-80">
                  ₹1,000
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPlan("yearly")}
              className={`rounded-lg py-3 px-4 transition-all duration-300 ${
                plan === "yearly"
                  ? "bg-emerald-400 text-slate-900 shadow-lg shadow-emerald-500/30"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="font-semibold">Yearly</span>
                <span className="text-sm opacity-80">
                  ₹10,000
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* Donation Slider */}
        <div>

          <div className="mb-6 flex items-end justify-between">

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Impact Percentage
              </label>

              <p className="mt-1 text-sm text-slate-400 italic">
                Directly to partner charities
              </p>
            </div>

            <span className="text-3xl font-bold text-emerald-400">
              {percentage}%
            </span>

          </div>

          <input
            type="range"
            min={10}
            max={30}
            step={1}
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="
              h-2
              w-full
              cursor-pointer
              appearance-none
              rounded-full
              bg-slate-700
              accent-emerald-400
            "
          />

          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>10% (Min)</span>
            <span>30% (Zenith)</span>
          </div>
        </div>
        {/* Contribution Summary */}
        <div className="flex gap-4 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-5">

          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
            <MdVolunteerActivism className="text-2xl text-emerald-400" />
          </div>

          <div className="flex-1">

            <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
              Your Contribution
            </h3>

            <div className="flex flex-wrap items-end gap-2">

              <span className="text-3xl font-bold text-white">
                ₹{charityAmount.toLocaleString()}
              </span>

              <span className="pb-1 text-slate-400">
                to Charity
              </span>

            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              From your{" "}
              <span className="capitalize">{plan}</span>{" "}
              payment, this amount goes directly to our verified
              charity partners.
            </p>

          </div>

        </div>

        {/* Submit Button */}
        <div className="pt-2">

          <button
            type="submit"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-emerald-400
              py-4
              text-lg
              font-semibold
              text-slate-900
              shadow-lg
              shadow-emerald-500/30
              transition-all
              duration-300
              hover:bg-emerald-300
              hover:shadow-emerald-400/40
              active:scale-[0.98]
            "
          >
            Confirm Subscription
            <FaArrowRight />
          </button>

          <p className="mt-4 text-center text-xs text-slate-500 sm:text-sm">
            Secured with institutional-grade encryption.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Cancel anytime.
          </p>

        </div>

      </form>
    </div>
  );
}