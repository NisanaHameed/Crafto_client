import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface state{
    auth:{
        profData:string,
        userData:string
    }
}

const HomeProtect = () => {
    const {profData} = useSelector((state:state)=>state.auth);
   if(profData){
    return <Navigate to='/professional' />
  }else{
    return <Outlet />
  }
}

export default HomeProtect