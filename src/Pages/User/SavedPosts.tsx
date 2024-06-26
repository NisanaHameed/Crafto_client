import { useEffect, useState } from "react"
import { userProfile } from "../../Api/user"
import Navbar from "../../Components/common/Navbar"
import { useNavigate } from "react-router-dom"

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
            const res: any = await userProfile();
            console.log(res);
            if (res?.data.userdata) {
                setSavedPosts(res.data.userdata.savedPosts);
            }
        }
        fetchUserdata();
    }, [])

    const designDetail = (id: string) => {

        navigate(`/postDetail/${id}`);
    }

    return (
        <>
            < Navbar role={'user'} />
            <div className="h-screen w-full">
                <div className=" mt-[70px]">
                    <h2 className="ml-5 mb-5 text-xl font-semibold text-[#007562] md:ml-14">Saved Posts</h2>
                    <div className="max-w-8xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-5 gap-4 mx-auto">
                        {savedPosts && savedPosts.map((val, index) => (
                            <div onClick={() => designDetail(val?._id)} key={index} className="max-w-full bg-white rounded-md">
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
        </>
    )
}

export default SavedPosts
