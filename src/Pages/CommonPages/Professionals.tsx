import { useEffect, useState } from "react"
import Navbar from "../../Components/common/Navbar"
import { getProfessionals } from "../../Api/admin"
import { getProfs } from "../../Api/professional"
import { useNavigate } from "react-router-dom"

interface IRole {
    role: 'user' | 'professional'
}
interface IProfs {
    _id:string
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
}

const Professionals: React.FC<IRole> = ({ role }) => {
    const [profs, setProfs] = useState<IProfs[]>([])
    useEffect(() => {
        const fetchProf = async () => {
            if (role == 'user') {
                const res = await getProfessionals();
                setProfs(res?.data?.profs);
            } else {
                const res = await getProfs();
                setProfs(res?.data?.profs);
            }
        }
        fetchProf();
    }, [])
    const navigate = useNavigate();

    const handleClick = (id:string)=>{
        if(role=='user'){
            navigate(`/profDetails/${id}`);
        }else{
            navigate(`/professional/profDetails/${id}`);
        }
    }
    return (
        <>
            <Navbar role={role} />
            <div className="w-full space-y-3 max-w-md md:max-w-2xl mt-10 bg-white mx-auto">
                {profs && profs.map((val, index) => (
                    <div onClick={()=>handleClick(val._id)} key={index} className="grid grid-cols-3 border border-gray-200 py-4 rounded cursor-pointer">
                        <div className="col-span-1 mx-auto"><img src={val.image} className="rounded-full w-20 h-20 object-cover" alt="" /></div>
                        <div className="col-span-2">
                            <h2 className="font-semibold inline">{val.firstname} {val.lastname}</h2>
                            {/* <button className="border border-[#3f8377] text-[#3f8377] hover:text-white hover:bg-[#3f8377] inline ml-6 px-4 py-[2px] rounded">Follow</button> */}
                            <h2 className="text-sm mt-2">{val.job} | {val.experience} years</h2>
                        </div>
                    </div>
                ))} 
            </div>
        </>
    )
}

export default Professionals
