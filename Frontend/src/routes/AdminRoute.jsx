import UserContext from "../contexts/user/UserContext";
import { useContext } from "react";
import Home from "../pages/Home";
import { Outlet } from "react-router-dom";


export default function AdminRoute(){
    let {user} = useContext(UserContext);
    if(!user || user.role != "admin"){
        return <Home></Home>
    }
    return <>
    <Outlet/>
    </>

}
