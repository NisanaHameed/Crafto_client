import Navbar from '../../Components/common/Navbar'
import HeroSection from '../../Components/common/HeroSection';
import Footer from '../../Components/common/Footer';
import DesignCards from '../../Components/User/DesignCards';

const Home = () => {
    
    return (
        <>
            < Navbar role={'user'} />
            < HeroSection role={'user'} />
            < DesignCards role={'user'}/>
            < Footer />
        </>
    )
}

export default Home;