import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface state{
    auth:{
        userData:string
    }
}

const UserLoggedIn = ()=>{
    const userData = useSelector((state:state)=>state.auth);

    return (
        userData.userData ? < Outlet /> : <Navigate to='/login' />
    )
}

export default UserLoggedIn;