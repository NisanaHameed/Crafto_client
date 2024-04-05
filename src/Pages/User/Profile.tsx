import ProfileSection from "../../Components/User/ProfileSection";
import Navbar from "../../Components/common/Navbar";
import ShowRequirements from "../../Components/User/ShowRequirements";

const Profile = ()=>{

    return (
        <div className="h-screen">
            < Navbar role={'user'} />
            < ProfileSection />
            <h2 className="mt-10 text-xl ml-4 md:ml-8 font-semibold">Requirements</h2>
            <div className="scrlbr flex gap-3 overflow-x-auto mx-4 md:ml-8">   
            < ShowRequirements />
            </div>
            </div>
    )
}
export default Profile;