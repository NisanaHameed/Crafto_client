
import ProfilePost from "../../Components/common/ProfilePost";
import ProfileAbout from "../../Components/common/ProfileAbout";
import Sidebar from "../../Components/Professional/Sidebar";
import { useEffect, useState } from "react";
import { profProfile } from "../../Api/professional";
import { useNavigate } from "react-router-dom";

interface Prof{
    firstname:string
    lastname:string
    email:string
    city:string
    job:string
    experience:number
    company:string
    bio:string
    image:string
    followers:number
}

const ProfilePage = () => {

    const [tab,setTab] = useState('post');
    const [data,setData] = useState<Prof>()
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await profProfile();
                setData(res?.data.profdata);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[])
    const navigate = useNavigate();

    return (
        <>
            < Sidebar />
            <main className="bg-gray-100 bg-opacity-25 mt-3 relative overflow-x-auto p-4 sm:ml-64 lg:ml-0">
                <div className="lg:w-8/12 lg:ml-96 mb-8">
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
                            <div className="md:flex md:flex-wrap md:items-center mb-4">
                                <h2 className="text-xl lg:text-2xl inline-block md:mr-2 mb-2 sm:mb-0">
                                    {data?.firstname} {data?.lastname}
                                </h2>
                                <a
                                onClick={()=>navigate('/professional/editProfile')}
                                    className="border border-[#007562] px-2 py-1 ml-5
                  text-[#007562] hover:bg-[#007562] hover:text-white font-semibold text-sm rounded text-center 
                  sm:inline-block block"
                                >
                                    Edit Profile
                                </a>
                            </div>
                            <ul className=" flex space-x-4 mb-4">
                                <li>
                                    <span className="font-semibold">136 </span>
                                    posts
                                </li>
                                <li>
                                    <span className="font-semibold">40.5k </span>
                                    followers
                                </li>
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
                            <li onClick={()=>setTab('post')} >
                                <a className="inline-block p-3" href="#">
                                    <i className="fas fa-th-large text-xl md:text-xs" />
                                    <span className={`lg:text-[14px] text-[#225c37] ${tab=='post' && 'font-bold'}`}>post</span>
                                </a>
                            </li>
                            <li onClick={()=>setTab('details')}>
                                <a className="inline-block p-3" href="#">
                                    <i className="far fa-square text-xl md:text-xs" />
                                    <span className={`lg:text-[14px] text-[#225c37] ${tab=='details' && 'font-bold'}`}>Details</span>
                                </a>
                            </li>
                            <li onClick={()=>setTab('portrait')}>
                                <a className="inline-block p-3" href="#">
                                    <span className={`lg:text-[14px] text-[#225c37] ${tab=='portrait' && 'font-bold'}`}>Portrait</span>
                                </a>
                            </li>
                        </ul>
                        {tab=='post' && < ProfilePost />}
                        
                        {tab=='details' && < ProfileAbout bio={data?.bio} company={data?.company} city={data?.city}/>}
                    </div>
                </div>
            </main>
        </>
    )
}
export default ProfilePage;