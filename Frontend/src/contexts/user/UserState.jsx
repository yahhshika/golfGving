import UserContext from "./UserContext";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
export default function UserState(props){
    let [user, setUser] = useState(null);

    const authUser = async()=>{
        const response = await api.get("/user");
        if(response?.data?.user){
            console.log(response.data.user);

            setUser(response.data.user);
        }
    }
    useEffect(()=>{
        if(!user){

            authUser().catch(err=>{
                console.log("initial user auth failed.")
            })
        }
    },[])
    return<>
    <UserContext.Provider value={{user, setUser, authUser}}>
        {props.children}
    </UserContext.Provider>
    </>
}