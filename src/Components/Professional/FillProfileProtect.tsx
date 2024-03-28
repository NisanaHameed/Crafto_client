import { Outlet,Navigate } from "react-router-dom";

const FillProfileProtect = ()=>{   

    let profotp = localStorage.getItem('profotp')
    
console.log('In FillProfileProtect'+profotp);

    return (

        profotp ? < Outlet /> : < Navigate to='/professional/login' />

    )
}

export default FillProfileProtect;