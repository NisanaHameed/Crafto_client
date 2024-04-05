import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { userProfile } from "../../Api/user";
import { userLogout } from "../../Store/Slice/AuthSlice";

interface state {
    auth: {
        userData: string
    }
}

const UserLoggedIn = () => {

    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res:any = await userProfile();
                if (res?.response?.data?.message == "User is blocked by admin!") {
                    setData(true);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])
    const userData = useSelector((state: state) => state.auth);
    if (loading == false && data) {
        dispatch(userLogout());
        return < Navigate to='/login' />
    } else if (loading == false) {
        return (
            userData.userData ? < Outlet /> : <Navigate to='/login' />
        )
    }
}

export default UserLoggedIn;