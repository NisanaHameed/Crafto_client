import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface state{
    auth:{
        adminData : string
    }
}

const AdminLoggedIn = ()=>{

    const {adminData} = useSelector((state:state)=>state.auth);
    console.log('in adminLoggedIn'+adminData)
    return (

        adminData ? < Navigate to='/admin/users' /> : < Outlet />

    )
}

export default AdminLoggedIn;