import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom";
import { profProfile } from "../../Api/professional";
import { profLogout } from "../../Store/Slice/AuthSlice";

interface state {
    auth: {
        profData: string
    }
}

const ProfLoggedIn = () => {

    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: any = await profProfile();
                if (res?.response?.data?.message == "Professional is blocked by admin!") {
                    setData(true);
                } else if (res?.response?.data?.message == 'Session has expired, please log in again.') {
                    setData(true);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }

        }
        fetchData();
    }, [])


    const { profData } = useSelector((state: state) => state.auth);

    if (loading == false && data) {
        dispatch(profLogout());
        return (< Navigate to='/professional/login' />)
    } else if (loading == false) {
        return (

            profData ? < Outlet /> : < Navigate to='/professional/login' />

        )
    }
}

export default ProfLoggedIn;