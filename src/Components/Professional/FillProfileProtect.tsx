import { Outlet, Navigate } from "react-router-dom";

const FillProfileProtect = () => {

    let profotp = localStorage.getItem('profotp')

    return (

        profotp ? < Outlet /> : < Navigate to='/professional/login' />

    )
}

export default FillProfileProtect;