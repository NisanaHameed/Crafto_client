import ProfileSection from "../../Components/User/ProfileSection";
import Navbar from "../../Components/common/Navbar";

const Profile = ()=>{
    let userData = localStorage.getItem('userData')
    return (
        <div className="h-screen">
            < Navbar role={'user'} isLoggedIn={userData}/>
            < ProfileSection />
        </div>
    )
}
export default Profile;