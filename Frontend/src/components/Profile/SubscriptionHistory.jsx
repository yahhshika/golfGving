import React from "react";
import { useContext } from "react";


export default function SubscriptionHistory({ subscriptions = [] }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white">
          Subscription History
        </h2>

        <span className="w-fit rounded-full bg-slate-800 px-4 py-1 text-sm text-emerald-400">
          Recent Activity
        </span>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-800">
            <tr className="text-left">
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                Charity
              </th>

              <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                Date
              </th>

              <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                Amount
              </th>

              <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.length ? (
              subscriptions.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="px-6 py-5 font-medium text-white">
                    {item.charityChosen || "Donation Not Made"}
                  </td>

                  <td className="px-6 py-5 text-slate-400">
                    {item.createdAt.toString().split("T")[0] || "not known"}
                  </td>

                  <td className="px-6 py-5 font-semibold text-emerald-400">
                    ₹{item.amount || "not known"}
                  </td>

                  <td className="px-6 py-5 text-right">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "active"
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                    >
                      {item.status || "not known"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-slate-500"
                >
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 p-4 md:hidden">
        {subscriptions.length ? (
          subscriptions.map((item) => (
            <div
              key={item._id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">
                  {item.charityName}
                </h3>

                <span
                  className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                    item.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Date</span>

                  <span className="text-white">{item.date}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Amount</span>

                  <span className="font-semibold text-emerald-400">
                    ₹{item.amount}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-slate-500">
            No subscriptions found.
          </div>
        )}
      </div>
    </div>
  );
}