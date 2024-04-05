import { Route, Routes } from "react-router-dom";
import Home from "../Pages/User/Home";
import Login from "../Pages/User/Login";
import Signup from "../Pages/User/Signup";
import Profile from "../Pages/User/Profile";
import Otp from "../Components/common/otp";
import UserLoggedOut from "../Components/User/UserLoggedOut";
import UserLoggedIn from "../Components/User/UserLoggedIn";
import HomeProtect from "../Components/User/HomeProtect";
import Designs from "../Pages/CommonPages/Designs";
import AllDesigns from "../Pages/CommonPages/AllDesigns";
import Feed from "../Pages/CommonPages/Feed";
import Professionals from "../Pages/CommonPages/Professionals";
import ProfDetail from "../Pages/CommonPages/ProfDetail";
import RequirementForm from "../Pages/User/RequirementForm";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<HomeProtect />} >
                <Route path="" element={<Home />} />
            </Route>
            <Route path='' element={<UserLoggedOut />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="verifyOtp" element={<Otp role={'user'} signup={true} />} />
            </Route>
            <Route path='' element={< UserLoggedIn />}>
                <Route path="profile" element={<Profile />} />
                <Route path='/designs/:category' element={<Designs role={'user'} />} />
                <Route path='/allDesigns' element={<AllDesigns role={'user'} />} />
                <Route path="/feed" element={<Feed role={'user'} />} />
                <Route path='/professionals' element={<Professionals role={'user'} />} />
                <Route path='/profDetails/:id' element={<ProfDetail role={'user'} />} />
                <Route path='/postRequirement' element={< RequirementForm />} />
            </Route>
        </Routes>
    )
}

export default UserRoutes;