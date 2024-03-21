import Navbar from '../../Components/common/Navbar'
import HeroSection from '../../Components/common/HeroSection';

const Home = () => {
    let profData = localStorage.getItem('profData');
    return (
        <>
            <Navbar role={'professional'} isLoggedIn={profData} />
            < HeroSection />
        </>
    )
}

export default Home;
