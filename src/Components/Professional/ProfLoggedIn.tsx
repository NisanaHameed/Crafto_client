import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface state{
    auth:{
        profData:string
    }
}

const ProfLoggedIn = ()=>{

    const {profData} = useSelector((state:state)=>state.auth);
    console.log(profData)
    console.log('token checking...')
    return (
        profData ? <Navigate to='/professional' /> : < Outlet />
    )
}

export default ProfLoggedIn;