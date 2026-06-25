// src/pages/Charities.jsx
import CharitiesHeader from "../components/Charities/CharitiesHeader";
import AllCharities from "../components/Charities/AllCharities";

export default function Charities() {
  return (
    <main className="min-h-screen bg-[#0B1326] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-20">
        <CharitiesHeader />
        <AllCharities />
      </div>
    </main>
  );
}