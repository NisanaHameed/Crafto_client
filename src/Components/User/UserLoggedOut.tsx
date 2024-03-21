import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface state{
    auth:{
        userData:string,
        profData:string
    }
}

const UserLoggedOut = ()=>{

    const {userData,profData} = useSelector((state:state)=>state.auth);
    console.log(userData)
    console.log('token checking...')
    // return (
    //     userData ? <Navigate to='/' /> : <Outlet />
    // )
    if(userData){
        return <Navigate to='/' />
    }else if(profData){
        return <Navigate to='/professional' />
    }else{
        return <Outlet />
    }

}

export default UserLoggedOut;