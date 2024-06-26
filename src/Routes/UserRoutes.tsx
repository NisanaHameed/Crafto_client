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
import Chat from "../Pages/User/Chat";
import Search from "../Pages/CommonPages/Search";
import PostDetail from "../Pages/CommonPages/PostDetail";
import SavedPosts from "../Pages/User/SavedPosts";
import SearchProfessionals from "../Pages/CommonPages/SearchProfessionals";
import ForgotPassword from "../Pages/CommonPages/ForgotPassword";
import OTP from "../Pages/CommonPages/OTP";
import ChangePassword from "../Pages/CommonPages/ChangePassword";
import ErrorPage from "../Pages/CommonPages/ErrorPage";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path='/forgotPassword' element={<ForgotPassword role="user" />} />
            <Route path='/forgotPasswordOTP' element={<OTP role='user' />} />
            <Route path='/changePassword' element={<ChangePassword role='user' />} />
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
                <Route path="/postDetail/:id" element={<PostDetail role={'user'} feedPage={true} />} />
                <Route path='/professionals' element={<Professionals role={'user'} />} />
                <Route path='/profDetails/:id' element={<ProfDetail role={'user'} />} />
                <Route path='/postRequirement' element={< RequirementForm />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/search' element={< Search role={'user'} />} />
                <Route path="/searchProfessionals" element={<SearchProfessionals role={'user'} />} />
                <Route path='/saved' element={< SavedPosts />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}

export default UserRoutes;