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

const ProfessionalRoutes = () => {
    return (
        <Routes>
            <Route path='' element={< HomeProtect />} >
                <Route path='' element={<Home />} />
            </Route>

            <Route path='' element={< ProfLoggedOut />}>
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
                <Route path='verifyOtp' element={<Otp role={'professional'} />} />
            </Route>
            <Route path='' element={<FillProfileProtect />}>
                <Route path='fillProfile' element={<FillProfile />} />
            </Route>
            <Route path='' element={< ProfLoggedIn />}>
                <Route path='profile' element={<ProfilePage />} />
                <Route path='/editProfile' element={<EditProfile/>} />
            </Route>

        </Routes>
    )
}

export default ProfessionalRoutes;