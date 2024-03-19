import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Admin/Login'
import Dashboard from '../Pages/Admin/Dashboard'
import Users from '../Pages/Admin/Users'
import Professionals from '../Pages/Admin/Professionals'
import AdminLoggedIn from '../Components/Admin/AdminLoggedIn'
import AdminLoggedOut from '../Components/Admin/AdminLoggedOut'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<AdminLoggedIn />}>
                <Route path='/login' element={<Login />} />
            </Route>
            <Route path='/' element={<AdminLoggedOut />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/users' element={<Users />} />
                <Route path='/professionals' element={<Professionals />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes;