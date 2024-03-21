import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface state{
    auth:{
        userData:string
    }
}

const HomeProtect = () => {
    const {userData} = useSelector((state:state)=>state.auth);
   if(userData){
    return <Navigate to='/' />
  }else{
    return <Outlet />
  }
}

export default HomeProtect