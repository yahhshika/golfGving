// src/components/charities/AllCharities.jsx
import CharityCard from "./CharityCard";
import { FaHandshake } from "react-icons/fa";
import api from "../../api/axios";
import UserContext from "../../contexts/user/UserContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
export default function AllCharities() {
  // Temporary data
  // Replace this with data from your backend later.
  let [charities, setCharities] = useState([]);


  useEffect(()=>{
    const fetchCharities = async()=>{
      const response = await api.get("/public/charities");
      if(response?.data?.charities){
        setCharities(response.data.charities);
      }
    }
    fetchCharities().catch(err=>{
      console.log("error in fetching charities");
    })
  },[]);

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl"><FaHandshake className="text-2xl text-emerald-400" /></span>

          <h2 className="text-3xl font-bold text-white">
            All Charities
          </h2>
        </div>

        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          Showing {charities?.length} Partners
        </p>
      </div>

      {/* Charity Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {charities.map((charity) => (
          <CharityCard
            key={charity?.id}
            name={charity?.name}
            description={charity?.description}
            image={charity?.image}
            tags={charity?.tags}
          />
        ))}
      </div>
    </section>
  );
}