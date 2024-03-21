import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Professional/Login'
import Signup from '../Pages/Professional/Signup'
import Otp from '../Components/common/otp'
import FillProfile from '../Pages/Professional/FillProfile'
import Home from '../Pages/Professional/Home'
import Profile from '../Pages/Professional/Profile'
import ProfLoggedOut from '../Components/Professional/ProfLoggedOut'
import ProfLoggedIn from '../Components/Professional/ProfLoggedIn'
import HomeProtect from '../Components/Professional/HomeProtect'

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

            <Route path='' element={< ProfLoggedIn />}>
                <Route path='fillProfile' element={<FillProfile />} />
                <Route path='profile' element={<Profile />} />
            </Route>

        </Routes>
    )
}

export default ProfessionalRoutes;