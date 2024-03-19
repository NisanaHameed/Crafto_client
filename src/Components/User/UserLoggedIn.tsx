import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface state{
    auth:{
        userData:string
    }
}

const UserLoggedIn = ()=>{

    const userData = useSelector((state:state)=>state.auth);
    console.log(userData)
    console.log('token checking...')
    return (
        userData.userData ? <Navigate to='/' /> : <Outlet />
    )

}

export default UserLoggedIn;