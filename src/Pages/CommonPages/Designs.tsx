import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getDesigns } from "../../Api/user";
import Navbar from "../../Components/common/Navbar";

interface IDesign {
    _id: string
    image: string
    profId: {
        company: string
        image: string
    }
}
interface IRole{
    role:'user' | 'professional'
}
const Designs:React.FC<IRole> = ({role}) => {

    const { category } = useParams();
    const [design, setDesign] = useState<IDesign[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPost = async () => {
            const res = await getDesigns(category as string);
            console.log(res)
            setDesign(res?.data?.posts);
        }
        fetchPost();
    }, [])
    
    const designDetail = (id:string)=>{
        if(role=='user'){
          navigate(`/postDetail/${id}`);
        }else{
          navigate(`/professional/postDetail/${id}`);
        }
      }
    return (
        <>
        <Navbar role={role} />
        <div className="h-screen w-full">
            <div className=" mt-[70px]">
                <h2 className="ml-5 mb-5 text-xl font-semibold text-[#007562] md:ml-14">{category}</h2>
                <div className="max-w-8xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-5 gap-4 mx-auto">
                    {design.map((val, index) => (
                        <div onClick={()=>designDetail(val?._id)} key={index} className="max-w-full bg-white rounded-md">
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

export default Designs
