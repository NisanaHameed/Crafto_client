import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom";

interface state {
    auth:{
        profData : string
    }
}

const ProfLoggedIn = ()=>{   

    const {profData} = useSelector((state:state)=>state.auth);
console.log('In profLoggedIn'+profData);

    return (

        profData ? < Outlet /> : < Navigate to='/professional/login' />

    )
}

export default ProfLoggedIn;