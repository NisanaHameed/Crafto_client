
import ProfilePost from "../../Components/common/ProfilePost";
import ProfileAbout from "../../Components/common/ProfileAbout";
import { useEffect, useState } from "react";
import { profDetails } from "../../Api/professional";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import { newConversation } from "../../Api/professional";
import { followProfessional, unfollowProf } from "../../Api/user";
import { jwtDecode } from "jwt-decode";

interface Prof {
    _id?: string
    firstname: string
    lastname: string
    email: string
    city: string
    job: string
    experience: number
    company: string
    bio: string
    image: string
    followers: Array<string>
}

interface IRole {
    role: 'user' | 'professional'
}

const ProfDetail: React.FC<IRole> = ({ role }) => {

    const { id } = useParams();
    const [tab, setTab] = useState('post');
    const [data, setData] = useState<Prof>()
    const [postCount, setPostCount] = useState(0)
    const [rerender, setRerender] = useState(false);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        if (role == 'user') {
            const { Id } = jwtDecode(JSON.parse(localStorage.getItem('userData') as string))
            setUserId(Id);
        }
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: any = await profDetails(id as string);
                console.log(res);
                setData(res?.data.profdata);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [rerender])
    const navigate = useNavigate();

    const handleConversation = async () => {
        const res = await newConversation(data?._id as string);
        console.log(res);
        if (res?.data.success) {
            navigate('/chat');
        }
    }

    const handlefollow = async () => {
        const res = await followProfessional(data?._id as string);
        if (res?.data?.success) {
            setRerender(!rerender);
        }
    }

    const handleUnfollow = async () => {
        const res = await unfollowProf(data?._id as string);
        if (res?.data?.success) {
            setRerender(!rerender);
        }
    }

    return (
        <>
            <Navbar role={role} />
            <div className="bg-gray-100 bg-opacity-25 relative overflow-x-auto p-4">
                <div className="lg:w-8/12 sm:w-9/12 mb-8 mx-auto">
                    <header className="flex flex-wrap items-center p-4 md:py-8">
                        <div className="md:w-3/12 md:ml-16">
                            <img
                                className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full
   border border-[#000000] "
                                src={data?.image}
                                alt="profile"
                            />
                        </div>
                        <div className="w-8/12 md:w-7/12 ml-4">
                            <div className="flex flex-wrap items-center mb-4">
                                <h2 className="text-xl lg:text-2xl inline-block md:mr-2 mb-2 sm:mb-0">
                                    {data?.firstname} {data?.lastname}
                                </h2>
                                {role == 'user' &&
                                    <><a
                                        onClick={handleConversation}
                                        className="border border-[#007562] px-2 py-1 ml-5
      text-[#007562] hover:bg-[#007562] hover:text-white font-semibold text-sm rounded text-center 
      sm:inline-block block cursor-pointer"
                                    >
                                        Message
                                    </a>
                                        {data?.followers?.includes(userId as string) ?

                                            <a
                                                onClick={handleUnfollow}
                                                className="bg-[#007562] px-2 py-1 ml-5
      text-white hover:text-white font-semibold text-sm rounded text-center 
      sm:inline-block block cursor-pointer"
                                            >
                                                Following
                                            </a>
                                            :
                                            <a
                                                onClick={handlefollow}
                                                className="border border-[#007562] px-2 py-1 ml-5
      text-[#007562] hover:bg-[#007562] hover:text-white font-semibold text-sm rounded text-center 
      sm:inline-block block cursor-pointer"
                                            >
                                                Follow
                                            </a>
                                        }
                                    </>
                                }
                            </div>
                            <ul className=" flex space-x-4 mb-4">
                                <li>
                                    <span className="font-semibold">{postCount} </span>
                                    posts
                                </li>
                                {/* <li>
                                    <span className="font-semibold">40.5k </span>
                                    followers
                                </li> */}
                            </ul>
                            <div className="block">
                                <span>{data?.job} | {data?.experience} years</span>
                            </div>
                        </div>
                    </header>
                    <div className="w-full px-px md:px-3">
                        <ul
                            className="flex items-center lg:mb-4 justify-around md:justify-center space-x-12  
  uppercase tracking-widest font-semibold text-xs text-gray-600
  border-t"
                        >
                            <li onClick={() => setTab('post')} >
                                <a className="inline-block p-3 cursor-pointer">
                                    <img src="/Posts.png" className="w-5 md:hidden" />
                                    <span className={`lg:text-[14px] hidden md:block text-[#225c37] ${tab == 'post' && 'font-bold'}`}>post</span>
                                </a>
                            </li>
                            <li onClick={() => setTab('details')}>
                                <a className="inline-block p-3 cursor-pointer">
                                    <img src="/Details.png" className="w-5 md:hidden" />
                                    <span className={`lg:text-[14px] hidden md:block text-[#225c37] ${tab == 'details' && 'font-bold'}`}>Details</span>
                                </a>
                            </li>
                        </ul>
                        {tab == 'post' && < ProfilePost professional={false} id={id as string} postCount={setPostCount} />}
                        {tab == 'details' && < ProfileAbout bio={data?.bio} company={data?.company} city={data?.city} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfDetail
