// src/pages/Admin/Draw.jsx

import DrawHeader from "../../components/Draw/DrawHeader";
import DrawResults from "../../components/Draw/DrawResults";
export default function Draw() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <DrawHeader />
        <DrawResults />
      </div>
    </main>
  );
}