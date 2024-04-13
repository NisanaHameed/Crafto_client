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

const ProfessionalRoutes = () => {
    return (
        <Routes>
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
                <Route path="/postDetail/:id" element={<PostDetail role={'professional'} />} />
                <Route path='/professionals' element={<Professionals role={'professional'} />} />
                <Route path='/profDetails/:id' element={<ProfDetail role={'professional'} />} />
                <Route path='/chat' element={< Chat />} />
                <Route path='/search' element={< Search role={'professional'} />} />
            </Route>

        </Routes>
    )
}

export default ProfessionalRoutes;