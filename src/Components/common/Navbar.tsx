import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { profLogout, userLogout } from "../../Store/Slice/AuthSlice"
import { profProfile, logout } from "../../Api/professional"
import { logout as userLogoutapi, userProfile } from "../../Api/user"
import toast from "react-hot-toast"

interface NavbarProps {
    role: 'user' | 'professional',
}

interface state {
    auth: {
        profData: string
        userData: string
    }
}

const Navbar: React.FC<NavbarProps> = ({ role }) => {

    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            if (role == 'professional' && isLoggedIn !== null) {
                let res: any = await profProfile();
                setImage(res?.data?.profdata.image);
            } else if (role == 'user' && isLoggedIn !== null) {
                let res: any = await userProfile();
                setImage(res?.data?.userdata?.image)
            }
        }
        fetchData();
    }, [role, isLoggedIn])

    const [toggle, setToggle] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(isLoggedIn)
    const [image, setImage] = useState('/profile.png')

    const { profData, userData } = useSelector((state: state) => state.auth);
    useEffect(() => {
        if (role == 'user') {
            setIsLoggedIn(userData);
        } else if (role == 'professional') {
            setIsLoggedIn(profData);
        }
    }, [])
    console.log('isLoggedIn', isLoggedIn)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogout = async () => {
        if (role === 'user') {
            await userLogoutapi();
            dispatch(userLogout())
            toast.success("You are logged out!")
            setIsLoggedIn('');
        } else if (role === 'professional') {
            await logout();
            dispatch(profLogout());
            toast.success("You are logged out!")
            setIsLoggedIn('');
        }
    }
    const handleSignin = () => {
        navigate('/login')
    }

    const clickProfile = () => {

        if (role == 'user') {
            navigate('/profile')
        } else {
            navigate('/professional/profile')
        }
    }

    const handleNotification = () => {
        if (isLoggedIn == null) {
            toast('Please Login!')
        } else {
            toast('Feature will be done in week3', {
                style: {
                    color: 'gray'
                }
            })
        }
    }

    const handleFeed = () => {
        if (role == 'user') {
            navigate('/feed');
        } else if (role == 'professional') {
            navigate('/professional/feed');
        }
    }

    const handleProfs = () => {
        if (role == 'user') {
            navigate('/professionals');
        } else if (role == 'professional') {
            navigate('/professional/professionals');
        }
    }

    const handleSubmit = ()=>{
        // e.preventDefault();

        // const urlParams = new URLSearchParams(location.search);
        // urlParams.set('searchTerm',searchTerm);
        // const searchQuery = urlParams.toString();
        navigate('/search');
    }

    return (
        <div>
            <nav className="bg-white border shadow-lg shadow-gray-200">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* <!-- Mobile menu button--> */}
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img onClick={() => navigate('/')} className="w-44 h-auto cursor-pointer" src="/craftoLogo.png" alt="CRAFTO" />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                                    <a onClick={handleFeed} className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 text-md font-medium cursor-pointer">FEEDS</a>
                                    <a onClick={handleProfs} className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 text-md font-medium cursor-pointer">PROFESSIONALS</a>
                                    {/* <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium">Projects</a>
            <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium">Calendar</a> */}
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='Search...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='hidden lg:inline rounded-full border-gray-300 cursor-pointer'

                            />
                        </form>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {isLoggedIn && role == 'user' && <img src='/plus.png' onClick={() => navigate('/postRequirement')} className="relative py-1 px-2 mr-2 rounded-full hover:bg-gray-100 cursor-pointer" />}
                            {isLoggedIn && <img src="/notification.png" onClick={handleNotification} className="w-6 cursor-pointer" alt="" />}

                            {/* <!-- Profile dropdown --> */}
                            {isLoggedIn ? (<div className="relative ml-3">
                                <div>
                                    <button type="button" onClick={() => setToggle(toggle => !toggle)} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src={image} alt="" />
                                    </button >
                                </div>
                                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden " role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" style={{ display: toggle ? 'block' : 'none' }}>
                                    {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                                    <a onClick={clickProfile} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" id="user-menu-item-0">Profile</a>
                                    {role == 'user' && <a onClick={() => navigate('/chat')} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" id="user-menu-item-1">Messages</a>}
                                    <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" id="user-menu-item-2">Logout</a>
                                </div>
                            </div>)
                                :
                                (
                                    <button type="button" onClick={handleSignin} className="relative py-2 px-4 border border-green-800 p-1 text-gray-800 font-semibold hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        Sign In
                                    </button>)
                            }
                        </div>
                    </div>
                </div>

                {/* <!-- Mobile menu, show/hide based on menu state. --> */}
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-2 px-2 pb-3 pt-2">
                        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        <a href="#" className="bg-gray-100 text-gray-100 block px-3 py-1 text-base font-medium" aria-current="page">Dashboard</a>
                        <a href="#" className="text-gray-700 hover:bg-gray-200 block rounded-md px-3 py-2 text-base font-medium">FEEDS</a>
                        <a href="#" className="text-gray-700 hover:bg-gray-200 block rounded-md px-3 py-2 text-base font-medium">PROFESSIONALS</a>
                        {/* <a href="#" className="text-gray-700 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;