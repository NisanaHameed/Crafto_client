import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface state{
    auth:{
        adminData : string
    }
}

const AdminLoggedOut = ()=>{

    const {adminData} = useSelector((state:state)=>state.auth);
    console.log('in adminLoggedOut'+adminData)
    return (

        adminData ? < Navigate to='/admin/dashboard' /> : < Outlet />

    )
}

export default AdminLoggedOut;