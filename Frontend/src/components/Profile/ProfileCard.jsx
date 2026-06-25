import { MdEmail, MdClose } from "react-icons/md";
import UserContext from "../../contexts/user/UserContext";
import { useContext, useEffect,useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import Score from "./Score";
import { useNavigate } from "react-router-dom";
export default function ProfileCard() {
  const navigate = useNavigate();
  let {user, setUser, authUser} = useContext(UserContext);
  // ----------------
  const [scores, setScores] = useState(user.scores);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [editingScore, setEditingScore] = useState(null);
  const [newScore, setNewScore] = useState("");
  
  useEffect(()=>{
    setScores(user.scores);
  },[user])
// helper functions
  const openModal = (score) => {
    setIsOpenModel(true);
    setEditingScore(score);
    setNewScore(score?.score || "");
  };
  
  const closeModal = () => {
    setIsOpenModel(false);
    setEditingScore(null);
    setNewScore("");
  };

  const handleSave = async() => {

    try{
      let url = "/user/score"
      if(editingScore){
        url = url+`/${editingScore._id}`
      }
      
      const response = await api.put(url,{score:newScore});
      if(response?.data?.message){
        toast.success(response.data.message);
      }
      authUser().catch(err=>{
        console.log("error in authUser after updating/adding score");
        toast.info("Successfully completed the task, kindly login again!");
        navigate("/login");
      })
      closeModal();
    }catch(err){
      console.log("error in score editing frontend");
      console.log(err.response?.data?.message);
      if(err.response?.data?.message){
        toast.error(err.response.data.message);
      }
    }
    


    // Backend API call goes here

  };
  // -----------------
  const avatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400";

  return (
    <>
    <section>
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-900/70 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-emerald-400/40 hover:shadow-emerald-500/10">
        {/* Glow Effect */}
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-8 p-6 sm:p-8 md:flex-row md:items-start">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="h-28 w-28 overflow-hidden rounded-2xl border-2 border-emerald-400 p-1 sm:h-32 sm:w-32">
              <img
                src={avatar}
                alt={user?.name}
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
              {user?.name}
            </h1>

            <div className="mt-3 flex items-center justify-center gap-2 text-slate-400 md:justify-start">
              <MdEmail className="text-lg text-emerald-400" />
              <span className="break-all">{user?.email}</span>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-6 border-t border-slate-700 pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Status
                </p>

                <p className="mt-1 text-lg font-semibold text-yellow-400">
                  {user?.role==="subscriber"?"subscriber":"non-subscriber"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Joined Since
                </p>

                <p className="mt-1 text-lg font-medium text-white">
                  {user?.createdAt.toString().split("T")[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* new 5 cards. */}
      <div className="border-t border-slate-700 px-6 py-6 sm:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
            Recent Scores
          </h3>

          {/* <button className="text-sm text-emerald-400 transition hover:text-emerald-300">
            View All
          </button> */}
          <button
            onClick={() => openModal(null)}
            className="text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
          >
            + Add New Score
          </button>
        </div>

        {!scores.length && 
        <p className="px-6 py-5 text-gray-400 italic">
          No Scores added, kindly add a score.
        </p>}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {scores.map((score) => (
            <Score
              key={score._id}
              score={score}
              onEdit={openModal}
            />
          ))}
        </div>
      </div>
    </section>
    {isOpenModel && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl border border-emerald-500/20 bg-slate-900 p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {editingScore ? "Edit Score" : "Add New Score"}
            </h2>

            <button
              onClick={closeModal}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <MdClose size={22} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Score
              </label>

              <input
                type="number"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={closeModal}
                className="rounded-xl border border-slate-700 px-5 py-2 text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-slate-900 transition hover:bg-emerald-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
    
  );
}