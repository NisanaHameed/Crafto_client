import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { profLogout, userLogout } from "../../Store/Slice/AuthSlice"
import { profProfile, logout, getNotifications } from "../../Api/professional"
import { logout as userLogoutapi, userProfile } from "../../Api/user"
import toast from "react-hot-toast"
import { io, Socket } from "socket.io-client"
import { jwtDecode } from "jwt-decode"
import { initFlowbite } from 'flowbite';

interface NavbarProps {
    role: 'user' | 'professional',
}

interface state {
    auth: {
        profData: string
        userData: string
    }
}
interface INotification {
    userId: string,
    message: string,
    category: string,
    createdAt: Date,
    readStatus: Boolean
}

const Navbar: React.FC<NavbarProps> = ({ role }) => {
    useEffect(() => {
        initFlowbite()
    }, [])
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    // const [notification, setNotification] = useState('');
    const [notifications, setNotications] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const socket = useRef<Socket | undefined>();

    const { profData, userData } = useSelector((state: state) => state.auth);

    const location = useLocation();
    const url = location.pathname.split('/').pop();

    useEffect(() => {
        socket.current = io("ws://localhost:3000");

        socket.current.on('getNotification', (data) => {
            console.log(data);
            toast((t) => (
                <div className="flex flex-row px-2 py-3">
                    <img src="/requirement.png" className="w-8 h-8 mr-4" alt="" />
                    <span className="text-[#2e695e]">
                        {data.message}
                    </span>
                    <button className="pl-4 " onClick={() => toast.dismiss(t.id)}>
                        <img src="/close.png" className="" alt="" />
                    </button>
                </div>
            ))
            // setNotification(data.message)
            setNotications((prev) => prev + 1);
        })
    }, [])

    useEffect(() => {
        if (role == 'professional' && profData) {
            const decoded: any = jwtDecode(profData)
            console.log('profidfrom token', decoded.Id)
            socket.current?.emit('addUser', decoded.Id);
        }
    }, [])

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

    useEffect(() => {

        const fetchNotifications = async () => {
            if (role == 'professional') {
                const res = await getNotifications();
                if (res?.data.success) {
                    const data = res.data.notifications.filter((val: INotification) =>
                        val.readStatus === false
                    )
                    setNotications(data.length);
                }
            }
        }
        fetchNotifications();
    }, [])

    const [toggle, setToggle] = useState(false);
    const [image, setImage] = useState('/profile.png')

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
        } else if (role == 'professional') {
            navigate('/professional/notifications');
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

    const handleMessages = ()=>{
        if(role=='user'){
            navigate('/chat')
        }else{
            navigate('/professional/chat')
        }
    }

    const handleSubmit = () => {
        console.log(url)
        if (url == 'professionals') {
            if (role == 'user') {
                navigate('/searchProfessionals');
            } else {
                navigate('/professional/searchProfessionals')
            }
        } else {
            if (role == 'user') {
                navigate('/search');
            } else {
                navigate('/professional/search')
            }
        }
    }

    const handleCreatePost = () => {
        navigate('/professional/createPost')
    }

    return (
        <div>
            <nav className="bg-white border shadow">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* <!-- Mobile menu button--> */}
                            <button onClick={() => setIsOpen(!isOpen)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
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
                                <img onClick={() => navigate('/')} className="w-36 h-auto cursor-pointer object-cover" src="/craftoLogo2.png" alt="CRAFTO" />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                                    <a onClick={handleFeed} className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 text-md font-medium cursor-pointer">FEEDS</a>
                                    <a onClick={handleProfs} className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 text-md font-medium cursor-pointer">PROFESSIONALS</a>
                                    {role === 'professional' && <a onClick={handleCreatePost} className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 text-md font-medium cursor-pointer">CREATE POST</a>}
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
                            {isLoggedIn && <div><img onClick={handleNotification} src="/notification.png" className="relative w-6 cursor-pointer inline-flex " alt="" />{notifications > 0 && <span className="absolute md:right-10 right-12 inline-flex items-center justify-center w-4 h-4  text-xs font-semibold text-green-800 bg-green-300 rounded-full">{notifications}</span>}</div>
                            }

                            {/* <!-- Profile dropdown --> */}
                            {isLoggedIn ? (<div className="relative ml-3">
                                <div>
                                    <button type="button" onClick={() => setToggle(toggle => !toggle)} className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 border border-gray-500 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full object-cover" src={image} alt="" />
                                    </button >
                                </div>
                                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden " role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" style={{ display: toggle ? 'block' : 'none' }}>
                                    {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                                    <a onClick={clickProfile} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" id="user-menu-item-0">Profile</a>
                                    <a onClick={handleMessages} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" id="user-menu-item-1">Messages</a>
                                    {role == 'user' && <a onClick={() => navigate('/saved')} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" id="user-menu-item-1">Saved Posts</a>}
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
                {isOpen && <div className="" id="mobile-menu">
                    <div className="space-y-2 px-2 pb-3 pt-2">
                        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        <a  className="bg-gray-100 text-gray-100 block px-3 py-1 text-base font-medium" aria-current="page">Dashboard</a>
                        <a onClick={handleFeed} className="text-gray-700 hover:bg-gray-200 block rounded-md px-3 py-2 text-base font-medium">FEEDS</a>
                        <a onClick={handleProfs} className="text-gray-700 hover:bg-gray-200 block rounded-md px-3 py-2 text-base font-medium">PROFESSIONALS</a>
                        {role === 'professional' && <a onClick={handleCreatePost} className="text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 text-md font-medium cursor-pointer">CREATE POST</a>}
                    </div>
                </div>
                }
            </nav>
            {/* {notification && 
            toast.success(`${notification}`)
            
            } */}
        </div>
    )
}

export default Navbar;