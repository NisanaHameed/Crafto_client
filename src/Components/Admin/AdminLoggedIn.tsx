import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { getUsers } from "../../Api/admin";
import { adminLogout } from "../../Store/Slice/AuthSlice";

interface state {
    auth: {
        adminData: string
    }
}

const AdminLoggedIn = () => {

    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('data fetching')
                const res: any = await getUsers(1,30);
                console.log('res',res)
                if (res?.response?.data?.message == 'Session has expired, please log in again.') {
                    setData(true)
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }

        }
        fetchData();
    }, [])
console.log('data',data)
    const { adminData } = useSelector((state: state) => state.auth);
    console.log('in adminLoggedIn' + adminData)
    if (loading === false && data) {
        console.log('odrrooooooo')
        dispatch(adminLogout());
        return (< Navigate to='/admin/login' />)
    } else if (loading == false) {
        return (
            adminData ? < Outlet /> : < Navigate to='/admin/login' />
        )
    }
}

    export default AdminLoggedIn;