// src/pages/Admin/Draw.jsx

import DrawHeader from "../../components/Draw/DrawHeader";
import DrawResults from "../../components/Draw/DrawResults";
import { useState, useEffect } from "react";
import api from "../../api/axios";
export default function Draw() {
  const [draw, setDraw] = useState({});
  const fetchDraw = async()=>{
    const response = await api.get("/public/draw");
    console.log(response.data?.draw)
    if(response?.data?.draw){
      setDraw(response.data.draw)
    }
  }
  useEffect(()=>{
    fetchDraw().catch(err=>{
      console.log("error in last draw fetch frontend");
    })
  },[])
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <DrawHeader setDraw={setDraw}/>
        <DrawResults draw={draw} fetchDraw={fetchDraw} />
      </div>
    </main>
  );
}