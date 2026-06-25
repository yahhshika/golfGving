// src/components/charities/AllCharities.jsx

import CharityCard from "./CharityCard";

export default function AllCharities() {
  // Temporary data
  // Replace this with data from your backend later.
  const charities = [
    {
      id: 1,
      name: "Green Links Foundation",
      description:
        "Protecting local ecosystems and preserving water resources through sustainable golf course initiatives.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
      tags: ["Environment"],
    },
    {
      id: 2,
      name: "Youth Tee Program",
      description:
        "Providing mentorship and educational opportunities to underprivileged children through golf.",
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200",
      tags: ["Education"],
    },
    {
      id: 3,
      name: "Swing For Health",
      description:
        "Funding rehabilitation and wellness programs for athletes recovering from injuries.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200",
      tags: ["Health"],
    },
    {
      id: 4,
      name: "Veteran Fairways",
      description:
        "Helping veterans reconnect with their communities through outdoor activities and sports.",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200",
      tags: ["Veterans"],
    },
    {
      id: 5,
      name: "Urban Par Project",
      description:
        "Building accessible sports facilities in urban communities to promote healthier lifestyles.",
      image:
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200",
      tags: ["Urban Development"],
    },
    {
      id: 6,
      name: "The Global Grant",
      description:
        "Supporting innovative social enterprises that leverage sports technology for global impact.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200",
      tags: ["Innovation"],
    },
  ];

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">❤️</span>

          <h2 className="text-3xl font-bold text-white">
            All Charities
          </h2>
        </div>

        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          Showing {charities.length} Partners
        </p>
      </div>

      {/* Charity Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {charities.map((charity) => (
          <CharityCard
            key={charity.id}
            name={charity.name}
            description={charity.description}
            image={charity.image}
            tags={charity.tags}
          />
        ))}
      </div>
    </section>
  );
}