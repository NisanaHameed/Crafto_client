import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Admin/Login'
import Dashboard from '../Pages/Admin/Dashboard'
import Users from '../Pages/Admin/Users'
import Professionals from '../Pages/Admin/Professionals'
import AdminLoggedOut from '../Components/Admin/AdminLoggedOut'
import AdminLoggedIn from '../Components/Admin/AdminLoggedIn'
import CategoryPage from '../Pages/Admin/CategoryPage'
import JobrolePage from '../Pages/Admin/JobrolePage'
import Subscription from '../Pages/Admin/Subscription'
import SubscriptionDetail from '../Pages/Admin/SubscriptionDetail'
import ErrorPage from '../Pages/CommonPages/ErrorPage'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<AdminLoggedOut />}>
                <Route path='login' element={<Login />} />
            </Route>
            <Route path='' element={<AdminLoggedIn />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/users' element={<Users />} />
                <Route path='/professionals' element={<Professionals />} />
                <Route path='/category' element={<CategoryPage />} />
                <Route path='/jobrole' element={<JobrolePage />} />
                <Route path='/subscriptions' element={<Subscription />} />
                <Route path='/subscriptionDetails/:id' element={<SubscriptionDetail />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}

export default AdminRoutes;