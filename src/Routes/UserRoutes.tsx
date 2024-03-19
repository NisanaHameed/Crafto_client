import { Route, Routes } from "react-router-dom";
import Home from "../Pages/User/Home";
import Login from "../Pages/User/Login";
import Signup from "../Pages/User/Signup";
import Profile from "../Pages/User/Profile";
import Otp from "../Components/common/otp";
import UserLoggedIn from "../Components/User/UserLoggedIn";
import UserLoggedOut from "../Components/User/UserLoggedOut";


const UserRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path='' element={<UserLoggedIn />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="verifyOtp" element={<Otp role={'user'} />} />
            </Route>
            <Route path='' element={< UserLoggedOut />}>
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}

export default UserRoutes;