import Sidebar from "../../Components/Admin/Sidebar";
import User from "../../Components/Admin/users";

const Users = ()=>{
    return (
        <div className='bg-gray-100 h-screen overflow-hidden '>
        < Sidebar />
        < User />
        </div>
    )
}
export default Users;