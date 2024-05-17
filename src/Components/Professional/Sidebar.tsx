import { useDispatch } from "react-redux"
import { profLogout } from "../../Store/Slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Api/professional";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        dispatch(profLogout());
        navigate('/professional');
    }
    useEffect(() => {
        initFlowbite()

    }, [])
    return (
        <>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            
                <aside id="logo-sidebar" className="w-64 rounded h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full z-50 bg-[#0a250f] px-3 py-4 overflow-y-auto shadow-md">
                    {/* <a onClick={() => navigate('/professional')} className="flex items-center pt-4 pb-6 ">
                        <img src="/craftoLogo.png" className="w-48 bg-white rounded-lg h-14 me-3  object-cover" alt="Crafto Logo" />
                    </a> */}
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a onClick={() => navigate('/professional/profile')} className="flex items-center font-normal p-2 pb-4 text-gray-200 rounded-lg hover:bg-[#133819] group cursor-pointer">
                                <img src="/profilewhite.png" className="w-6" alt="" />
                                <span className="ms-3">Profile</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/professional/chat')} className="flex items-center font-normal p-2 pb-4 text-gray-200 rounded-lg hover:bg-[#133819] group cursor-pointer">
                                <img src="/messageicon.png" className="w-6" alt="" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Messages</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/professional/notifications')} className="flex cursor-pointer items-center font-normal p-2 pb-4 text-gray-200 rounded-lg hover:bg-[#133819] group">
                                <img src="/notificationicon.png" className="w-6" alt="" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Notifications</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/professional/createPost')} className="flex items-center font-normal p-2 pb-4 text-gray-200 rounded-lg hover:bg-[#133819] group cursor-pointer">
                                <img src="/createicon.png" className="w-6" alt="" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Create Post</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/professional/saved')} className="flex items-center font-normal p-2 pb-4 cursor-pointer text-gray-200 rounded-lg hover:bg-[#133819] group">
                                <img src="/savewhite.png" className="w-7" alt="" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Saved Posts</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/professional/requirements')} className="flex items-center font-normal p-2 pb-4 cursor-pointer text-gray-200 rounded-lg hover:bg-[#133819] group">
                                <img src="/requirementwhite.png" className="w-6 h-6" alt="" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Requirements</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/professional/subscribe')} className="flex items-center font-normal p-2 pb-4 cursor-pointer text-gray-200 rounded-lg hover:bg-[#133819] group">
                                <img src="/verifiedwhite.png" className="w-6" alt="" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Subscription</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={handleLogout} className="flex items-center font-normal p-2 pb-4 cursor-pointer text-gray-200 rounded-lg hover:bg-[#133819] group">
                                <img src="/logouticon.png" className="w-6" alt="" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            
        </>
    )
}

export default Sidebar