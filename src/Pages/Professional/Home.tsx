import Navbar from '../../Components/common/Navbar'
import HeroSection from '../../Components/common/HeroSection';
import DesignCards from '../../Components/User/DesignCards';
import Footer from '../../Components/common/Footer';

const Home = () => {

    return (
        <>
            < Navbar role={'professional'} />
            < HeroSection role={'professional'} />
            < DesignCards role={'professional'} />
            < Footer />
        </>
    )
}

export default Home;
