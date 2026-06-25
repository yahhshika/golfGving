import { useState } from "react";
import { MdPayments, MdEmojiEvents } from "react-icons/md";

import SubscriptionHistory from "./SubscriptionHistory";
import WinningHistory from "./WinningHistory";

export default function UserData() {
  const [activeTab, setActiveTab] = useState("subscription");

  // Dummy Data (Replace with API response)
  const subscriptions = [
    {
      _id: 1,
      charityName: "Ocean Cleanup",
      date: "2024-03-12",
      amount: 25,
      status: "Active",
    },
    {
      _id: 2,
      charityName: "Green Canopy",
      date: "2024-02-12",
      amount: 25,
      status: "Active",
    },
    {
      _id: 3,
      charityName: "Water.org",
      date: "2024-01-12",
      amount: 25,
      status: "Expired",
    },
  ];

  const winnings = [
    {
      _id: 1,
      drawId: "#GG-9021",
      matchType: "Masters Draw",
      prize: 1200,
      date: "2024-03-01",
    },
    {
      _id: 2,
      drawId: "#GG-8842",
      matchType: "Weekly Open",
      prize: 50,
      date: "2024-02-15",
    },
    {
      _id: 3,
      drawId: "#GG-7731",
      matchType: "Charity Major",
      prize: 500,
      date: "2024-01-20",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Tabs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          onClick={() => setActiveTab("subscription")}
          className={`group relative flex h-32 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border transition-all duration-300 active:scale-95 ${
            activeTab === "subscription"
              ? "border-emerald-500 bg-emerald-500 text-slate-900"
              : "border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
          }`}
        >
          <MdPayments className="text-4xl relative z-10" />

          <span className="relative z-10 text-center text-sm font-semibold">
            Subscription History
          </span>

          <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0" />
        </button>

        <button
          onClick={() => setActiveTab("winning")}
          className={`group relative flex h-32 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border transition-all duration-300 active:scale-95 ${
            activeTab === "winning"
              ? "border-emerald-500 bg-emerald-500 text-slate-900"
              : "border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
          }`}
        >
          <MdEmojiEvents className="text-4xl relative z-10" />

          <span className="relative z-10 text-center text-sm font-semibold">
            Winning History
          </span>

          <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0" />
        </button>
      </div>

        {/* Animated Content */}
        <div key={activeTab} className="animate-in fade-in duration-300">
            {activeTab === "subscription" ? (
            <SubscriptionHistory subscriptions={subscriptions} />
            ) : (
            <WinningHistory winnings={winnings} />
            )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
            <button
            className="w-full rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white active:scale-95 sm:w-auto"
            >
            Cancel Subscription
            </button>

            <button
            className="w-full rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:bg-emerald-400 active:scale-95 sm:w-auto"
            >
            Take New Subscription
            </button>
        </div>
    </section>
  );
}