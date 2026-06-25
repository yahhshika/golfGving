import UserContext from "./UserContext";
import { useState } from "react";

export default function UserState(props){
    let [user, setUser] = useState({role:"admin"});

    return<>
    <UserContext.Provider value={{user, setUser}}>
        {props.children}
    </UserContext.Provider>
    </>
}