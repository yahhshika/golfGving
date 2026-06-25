import ProfileCard from "../../components/Profile/ProfileCard";
import UserData from "../../components/Profile/UserData";

export default function Profile() {
  return (
    <main className="min-h-screen bg-slate-950 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        <ProfileCard />
        <UserData />
      </div>
    </main>
  );
}