import React from 'react'
import { useContext } from 'react'
import UserContext from '../contexts/user/UserContext'
import Home from '../pages/Home';
import { Outlet } from 'react-router-dom';
export default function UserRuote(){
    let {user} = useContext(UserContext);
    if(!user || user.role==="admin"){
        return <Home></Home>
    }
    return <>
    <Outlet/>
    </>
}
