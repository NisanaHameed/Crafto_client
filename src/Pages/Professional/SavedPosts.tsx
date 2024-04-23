import { useEffect, useState } from "react";
import Sidebar from "../../Components/Professional/Sidebar"
import { useNavigate } from "react-router-dom";
import { profProfile } from "../../Api/professional";
import Navbar from "../../Components/common/Navbar";

interface IPost {
    _id: string
    image: string
    profId: {
        company: string
        image: string
    }
}

const SavedPosts = () => {

    const [savedPosts, setSavedPosts] = useState<IPost[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserdata = async () => {
            const res: any = await profProfile();
            console.log(res);
            if (res?.data.profdata) {
                setSavedPosts(res.data.profdata.savedPosts);
            }
        }
        fetchUserdata();
    }, [])

    const designDetail = (id: string) => {

        navigate(`/postDetail/${id}`);
    }
    return (
        <>
        < Navbar role='professional' />
        <div className="flex flex-row">
                <div className="md:w-1/4 w-0">
                    < Sidebar />
                </div>
                <div className="mt-10 md:w-3/4 w-full px-5">
            {/* <div className="mt-3 w-full overflow-x-auto p-4 sm:ml-64 lg:ml-28"> */}
                <div className="mt-10">
                    <h2 className=" mb-5 text-xl font-semibold text-[#007562] md:ml-10 lg:ml-0">Saved Posts</h2>
                    <div className="max-w-5xl grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2">
                        {savedPosts && savedPosts.map((val, index) => (
                            <div onClick={() => designDetail(val?._id)} key={index} className="w-full object-cover rounded bg-white">
                                <a>
                                    <img className="rounded h-52 lg:h-80 w-full object-cover filter hover:brightness-75 cursor-pointer" src={val.image} alt="" />
                                </a>
                                <div className="py-2">
                                    <a>
                                        <h5 className="lg:text-base md:text-sm text-sm font-normal tracking-tight text-gray-900 cursor-pointer"><img src={val.profId.image} className="w-4 h-4 rounded-full inline object-cover mr-2" />{val.profId?.company}</h5>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default SavedPosts
