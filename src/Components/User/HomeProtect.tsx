import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { userProfile } from "../../Api/user";
import { userLogout } from "../../Store/Slice/AuthSlice";

interface state {
  auth: {
    profData: string,
    userData: string
  }
}

const HomeProtect = () => {

  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await userProfile();
        if (res?.response?.data?.message == "User is blocked by admin!") {
          setData(true);
        } else if (res?.response?.data?.message == 'Session has expired, please log in again.') {
          setData(true)
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, [])
  const { profData } = useSelector((state: state) => state.auth);
  if (profData) {
    return <Navigate to='/professional' />
  } else if (loading == false && data) {
    dispatch(userLogout());
    return < Navigate to='/login' />
  } else if (loading == false) {
    return <Outlet />
  }
}

export default HomeProtect