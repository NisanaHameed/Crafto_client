import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface state {
    auth: {
        userData: string,
        profData: string
    }
}

const ProfLoggedOut = () => {

    const { userData, profData } = useSelector((state: state) => state.auth);
    if (userData) {
        return <Navigate to='/' />
    } else if (profData) {
        return <Navigate to='/professional' />
    } else {
        return <Outlet />
    }
}

export default ProfLoggedOut;