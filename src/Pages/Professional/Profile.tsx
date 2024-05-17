
import ProfilePost from "../../Components/common/ProfilePost";
import ProfileAbout from "../../Components/common/ProfileAbout";
import Sidebar from "../../Components/Professional/Sidebar";
import { useEffect, useState } from "react";
import { getPortraits, profProfile } from "../../Api/professional";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";

interface Prof {
    firstname: string
    lastname: string
    email: string
    city: string
    job: string
    experience: number
    company: string
    bio: string
    image: string
    followers: number
    isVerified: boolean
}
interface IPost {
    _id?: string
    category: string
    caption: string
    image: string
}

const ProfilePage = () => {

    const [tab, setTab] = useState('post');
    const [data, setData] = useState<Prof>()
    const [portrait, setPortrait] = useState<IPost[]>([])
    const [postCount, setPostCount] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: any = await profProfile();
                setData(res?.data.profdata);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        const fetchPortraits = async () => {
            const res = await getPortraits();
            setPortrait(res?.data.portraits);
        }
        fetchPortraits();
    }, [])
    const navigate = useNavigate();

    const designDetail = (id: string) => {

        navigate(`/professional/postDetail/${id}`);
    }

    return (
        <>
            < Navbar role='professional' />
            <div className="flex flex-row">
                <div className="md:w-1/4 w-0 z-10">
                    < Sidebar />
                </div>
                <div className="mt-8 md:w-3/4 w-full px-5">
                    {/* <main className="bg-gray-100 bg-opacity-25 mt-3 relative overflow-x-auto p-4 sm:ml-64 lg:ml-0"> */}
                    <div className="lg:w-8/12 lg:ml-20 mb-8">
                        <header className="flex flex-wrap items-center p-4 md:py-8">
                            <div className="md:w-3/12 md:ml-16">
                                <img
                                    className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full
               border border-gray-500 "
                                    src={data?.image}
                                    alt="profile"
                                />
                            </div>
                            <div className="w-8/12 md:w-7/12 ml-4">
                                <div className="flex flex-wrap items-center mb-4">
                                    <h2 className="text-lg lg:text-lg inline-block md:mr-2 mb-2 sm:mb-0">
                                        {data?.firstname} {data?.lastname}
                                        {data?.isVerified && <img src="/verified.png" className="w-7 inline ml-2" alt="" />}
                                    </h2>
                                    <a
                                        onClick={() => navigate('/professional/editProfile')}
                                        className="border border-[#007562] px-2 py-1 ml-5
                  text-[#007562] hover:bg-[#007562] hover:text-white font-semibold text-sm rounded text-center 
                  sm:inline-block block cursor-pointer"
                                    >
                                        Edit Profile
                                    </a>
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
                                <div className="hidden md:block">
                                    <span>{data?.job} | {data?.experience} years</span>
                                </div>
                            </div>
                            <div className="md:hidden text-sm my-2">
                                <span>{data?.job} | {data?.experience} years</span>
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
                                <li onClick={() => setTab('portrait')}>
                                    <a className="inline-block p-3 cursor-pointer">
                                        <img src="/portrait2.png" className="w-5 md:hidden" />
                                        <span className={`lg:text-[14px] hidden md:block text-[#225c37] ${tab == 'portrait' && 'font-bold'}`}>Portrait</span>
                                    </a>
                                </li>
                            </ul>
                            {tab == 'post' && < ProfilePost professional={true} id={''} postCount={setPostCount} />}

                            {tab == 'details' && < ProfileAbout bio={data?.bio} company={data?.company} city={data?.city} />}
                            {tab == 'portrait' &&
                                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {portrait && portrait.map((val, index) =>
                                    (
                                        <div onClick={() => designDetail(val?._id as string)} key={index}>
                                            <img className="h-40 md:h-48 w-full object-cover rounded cursor-pointer" src={val.image} alt="" />
                                        </div>
                                    )
                                    )}
                                </div>
                            }
                        </div>
                    </div>

                    {/* </main> */}
                </div>
            </div>
        </>
    )
}
export default ProfilePage;