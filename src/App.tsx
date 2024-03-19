import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import ProfessionalRoutes from './Routes/ProfessionalRoutes';

const App = () => {
    return (
        <Router>
        <Routes>
            <Route path='/*' element={<UserRoutes />} />
            <Route path='/professional/*' element={<ProfessionalRoutes />} />
            <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
        </Router>
    );
}

export default App;