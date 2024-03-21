import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import ProfessionalRoutes from './Routes/ProfessionalRoutes';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './Components/common/ScrollToTop';

const App = () => {
    return (
        <> 
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Router>
           < ScrollToTop/>
                <Routes>
                    <Route path='/*' element={<UserRoutes />} />
                    <Route path='/professional/*' element={<ProfessionalRoutes />} />
                    <Route path='/admin/*' element={<AdminRoutes />} />
                </Routes>
            </Router>
            
        </>
    );
}

export default App;