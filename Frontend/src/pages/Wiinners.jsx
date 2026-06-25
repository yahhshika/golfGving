import UserResult from "../components/Winners/UserResult";
import DrawTicket from "../components/Winners/DrawTicket";
import RecentResults from "../components/Winners/RecentResults";
import api from "../api/axios";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/user/UserContext";
export default function Wiinners() {
  let {user} = useContext(UserContext);
  let [winners, setWiners] = useState([])
  let [draw, setDraw] = useState({numbers:["-","-","-","-","-"]})

  useEffect(()=>{
    const fetchData = async()=>{
      const responeWin = await api.get("/public/winners");
      console.log(responeWin.data);
      if(responeWin?.data?.winners){
        console.log("winners")
        console.log(responeWin.data.winners)
        setWiners(responeWin.data.winners)
      }
      const responeDraw = await api.get("/public/draw");
      console.log(responeDraw.data);
      if(responeDraw?.data?.draw){
        console.log("draw")
        console.log(responeDraw.data.draw)
        setDraw(responeDraw.data.draw);
      }
    }
    fetchData().catch(err=>{
      console.log("error in fetching data for winners");
    })
    
  },[])
  
  return (
    <main className="min-h-screen bg-[#0b1326] text-white pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 space-y-12">
        {user && user.role==="subscriber" &&
        <UserResult winners={winners} />
        }
        <DrawTicket draw={draw}/>
        <RecentResults winners={winners}/>
      </div>
    </main>
  );
}