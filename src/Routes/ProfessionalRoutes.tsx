import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Professional/Login'
import Signup from '../Pages/Professional/Signup'
import Otp from '../Components/common/otp'
import FillProfile from '../Pages/Professional/FillProfile'
import Home from '../Pages/Professional/Home'
import ProfilePage from '../Pages/Professional/Profile'
import ProfLoggedOut from '../Components/Professional/ProfLoggedOut'
import ProfLoggedIn from '../Components/Professional/ProfLoggedIn'
import HomeProtect from '../Components/Professional/HomeProtect'
import FillProfileProtect from '../Components/Professional/FillProfileProtect'
import EditProfile from '../Pages/Professional/EditProfile'
import CreatePost from '../Pages/Professional/CreatePost'
import Designs from '../Pages/CommonPages/Designs'
import AllDesigns from '../Pages/CommonPages/AllDesigns'
import Feed from '../Pages/CommonPages/Feed'
import Professionals from '../Pages/CommonPages/Professionals'
import ProfDetail from '../Pages/CommonPages/ProfDetail'
import Chat from '../Pages/Professional/Chat'
import Search from '../Pages/CommonPages/Search'
import PostDetail from '../Pages/CommonPages/PostDetail'
import SavedPosts from '../Pages/Professional/SavedPosts'
import Notification from '../Pages/Professional/Notification'
import Requirements from '../Pages/Professional/Requirements'
import Subscription from '../Pages/Professional/Subscription'
import SuccessPayment from '../Pages/Professional/SuccessPayment'
import CancelPayment from '../Pages/Professional/CancelPayment'
import SearchProfessionals from '../Pages/CommonPages/SearchProfessionals'
import ForgotPassword from '../Pages/CommonPages/ForgotPassword'
import OTP from '../Pages/CommonPages/OTP'
import ChangePassword from '../Pages/CommonPages/ChangePassword'
import ErrorPage from '../Pages/CommonPages/ErrorPage'

const ProfessionalRoutes = () => {
    return (
        <Routes>
            <Route path='/forgotPassword' element={<ForgotPassword role="professional" />} />
            <Route path='/forgotPasswordOTP' element={<OTP role='professional' />} />
            <Route path='/changePassword' element={<ChangePassword role='professional' />} />
            
            <Route path='' element={< HomeProtect />} >
                <Route path='' element={<Home />} />
            </Route>

            <Route path='' element={< ProfLoggedOut />}>
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
                <Route path='verifyOtp' element={<Otp role={'professional'} signup={true} />} />
            </Route>
            <Route path='' element={<FillProfileProtect />}>
                <Route path='fillProfile' element={<FillProfile />} />
            </Route>
            <Route path='' element={< ProfLoggedIn />}>
                <Route path='profile' element={<ProfilePage />} />
                <Route path='/editProfile' element={<EditProfile />} />
                <Route path='/editProfile/verifyOtp' element={<Otp role={'professional'} signup={false} />} />
                <Route path='/createPost' element={< CreatePost />} />
                <Route path='/designs/:category' element={<Designs role={'professional'} />} />
                <Route path='/allDesigns' element={<AllDesigns role={'professional'} />} />
                <Route path='/feed' element={<Feed role='professional' />} />
                <Route path="/postDetail/:id" element={<PostDetail role={'professional'} feedPage={true} />} />
                <Route path="/postDetails/:id" element={<PostDetail role={'professional'} feedPage={false} />} />
                <Route path='/professionals' element={<Professionals role={'professional'} />} />
                <Route path='/profDetails/:id' element={<ProfDetail role={'professional'} />} />
                <Route path='/chat' element={< Chat />} />
                <Route path='/search' element={< Search role={'professional'} />} />
                <Route path="/searchProfessionals" element={<SearchProfessionals role={'professional'} />} />
                <Route path='/saved' element={< SavedPosts />} />
                <Route path='/notifications' element={< Notification />} />
                <Route path='/requirements' element={<Requirements />} />
                <Route path='/subscribe' element={<Subscription />} />
                <Route path='/successPayment/:id' element={<SuccessPayment />} />
                <Route path='/cancelPayment/:id' element={<CancelPayment />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}

export default ProfessionalRoutes;