import UserResult from "../components/Winners/UserResult";
import DrawTicket from "../components/Winners/DrawTicket";
import RecentResults from "../components/Winners/RecentResults";

export default function Wiinners() {
  return (
    <main className="min-h-screen bg-[#0b1326] text-white pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 space-y-12">
        <UserResult />
        <DrawTicket />
        <RecentResults />
      </div>
    </main>
  );
}