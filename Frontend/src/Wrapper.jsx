import Navbar from "./components/utils/Navbar";
import Footer from "./components/utils/Footer";

import UserState from "./contexts/user/UserState";
import { Outlet } from "react-router-dom";
export default function Wrapper(){

    return <>
    <UserState>
        <Navbar/>
        <div className="min-h-screen">
            <Outlet/>
        </div>
        <Footer/>
    </UserState>

    
    </>

}