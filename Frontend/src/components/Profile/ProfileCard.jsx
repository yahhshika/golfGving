import { MdEmail } from "react-icons/md";

export default function ProfileCard() {
  // Replace this with your user data/context
  const user = {
    name: "Yashika",
    email: "yashikasoni@gmail.com",
    status: "Subscriber",
    memberSince: "2024-03-11",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  };

  return (
    <section>
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-900/70 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-emerald-400/40 hover:shadow-emerald-500/10">
        {/* Glow Effect */}
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-8 p-6 sm:p-8 md:flex-row md:items-start">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="h-28 w-28 overflow-hidden rounded-2xl border-2 border-emerald-400 p-1 sm:h-32 sm:w-32">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full rounded-xl object-cover"
              />
            </div>

            <span className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-lg">
              Active
            </span>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {user.name}
            </h1>

            <div className="mt-3 flex items-center justify-center gap-2 text-slate-400 md:justify-start">
              <MdEmail className="text-lg text-emerald-400" />
              <span className="break-all">{user.email}</span>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-6 border-t border-slate-700 pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Status
                </p>

                <p className="mt-1 text-lg font-semibold text-yellow-400">
                  {user.status}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Member Since
                </p>

                <p className="mt-1 text-lg font-medium text-white">
                  {user.memberSince}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}