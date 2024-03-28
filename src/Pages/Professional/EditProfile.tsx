import EditDetails from "../../Components/Professional/EditDetails"
import Navbar from "../../Components/common/Navbar"

const EditProfile = () => {
    let profdata = localStorage.getItem('profData')
  return (
    <div className="h-screen">
    <Navbar role={'professional'} isLoggedIn={profdata} />
    < EditDetails />
    </div>
  )
}

export default EditProfile
