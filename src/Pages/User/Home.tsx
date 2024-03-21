import Navbar from '../../Components/common/Navbar'
import HeroSection from '../../Components/common/HeroSection';
import Footer from '../../Components/common/Footer';
import DesignCards from '../../Components/User/DesignCards';

const Home = () => {
    let userData = localStorage.getItem('userData')
    console.log(userData)
    return (
        <>
            < Navbar role={'user'} isLoggedIn={userData} />
            < HeroSection />
            < DesignCards />
            < Footer />
        </>
    )
}

export default Home;