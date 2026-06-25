// src/components/charities/CharityCard.jsx
import api from "../../api/axios";
import { toast } from "react-toastify";
import UserContext from "../../contexts/user/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export default function CharityCard({
  name,
  description,
  image,
  tags = [],
}) {
  let {authUser, setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const handleDonation = async()=>{
    try{
      name = name.split(" ").join("%20");
      const response = await api.put(`/user/charity/${name}`);
      if(response?.data?.message){
        const tId = toast.loading("Verifying Donation Checks...");
        setTimeout(()=>{

          toast.update(tId, {
            render:response.data.message,
            type:"success",
            isLoading:false,
            autoClose:3000
          });
          authUser().catch(err=>{
            console.log("error in authUser after donation.");
            toast.info("Kindly Login again");
            navigate("/login");
          })
        },3000);
        
      }
    }catch(err){
      console.log("error in login frontend");
      console.log(err.response?.data?.message);
      if(err.response?.data?.message){
        toast.error(err.response.data.message);
      }
    }
  }
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]">
      {/* Image */}
      <div className="relative h-56 overflow-hidden sm:h-64">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1326] via-[#0B1326]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-emerald-400">
          {name || "not known"}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
          {description || "-"}
        </p>

        {/* Learn More */}
        <button onClick={handleDonation} 
          className="mt-6 flex items-center gap-2 font-medium cursor-pointer text-emerald-400 transition-all duration-300 group-hover:gap-3"
        >
          Donate Here
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
}