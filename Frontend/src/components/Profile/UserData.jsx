import { useState, useContext } from "react";
import {Link} from "react-router-dom"
import { MdPayments, MdEmojiEvents } from "react-icons/md";
import { toast } from "react-toastify";
import SubscriptionHistory from "./SubscriptionHistory";
import WinningHistory from "./WinningHistory";
import api from "../../api/axios";
import UserContext from "../../contexts/user/UserContext";

export default function UserData() {
  const [activeTab, setActiveTab] = useState("subscription");
  let {user,authUser,setUser} = useContext(UserContext);

  const handleSubscriptionCancellation = async()=>{
    try{
      const response = await api.delete("/user/subscription");
      if(response?.data?.message){
        toast.info(response.data.message);
      }
      authUser().catch((err)=>{
        console.log("Error in authUser after subscription cancellation")
        setUser(null);
      });
      

    }catch(err){
      console.log("error in cancel subscription frontend");
      console.log(err.response?.data?.message);
      if(err.response?.data?.message){
        toast.error(err.response.data.message);
      }
    }
  }





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
            <SubscriptionHistory subscriptions={user.subscriptions} />
            ) : (
            <WinningHistory winnings={user.winnings} />
            )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
            <button onClick={handleSubscriptionCancellation}
            className="w-full rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white active:scale-95 sm:w-auto"
            >
            Cancel Subscription
            </button>

            <Link to={"/subscribe"}
            className="w-full rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:bg-emerald-400 active:scale-95 sm:w-auto"
            >
            Take New Subscription
            </Link>
        </div>
    </section>
  );
}