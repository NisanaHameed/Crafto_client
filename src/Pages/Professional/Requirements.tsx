import { useEffect, useState } from "react"
import Sidebar from "../../Components/Professional/Sidebar"
import { getRequirements, profProfile } from "../../Api/professional"
import Navbar from "../../Components/common/Navbar"
import { useNavigate } from "react-router-dom"

interface IRequirement {
    _id:string,
    area: string,
    budget: string,
    workPeriod: string,
    service: string,
    rooms?: string,
    type?: string,
    scope?: string,
    plan?: string,
    status: string,
    mobile:string
}

const Requirements = () => {

    const [requirements,setRequirements] = useState<IRequirement[]>([])
    const [isVerified,setIsVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchProfile = async()=>{

            let res:any = await profProfile();
            if(res.data.success){
                setIsVerified(res.data.profdata.isVerified);
                // setRequirements(res.data.profdata.requirements)
            }
        }
        fetchProfile();
    },[])

    useEffect(()=>{
        const fetchdata = async()=>{
            const res = await getRequirements();
            console.log(res)
            if(res?.data.success){
                const data = res.data.requirements.filter((val:IRequirement)=>
                    val.status === 'active'
                )
                setRequirements(data);
            }
        }
        fetchdata();
    },[])
    return (
        <>
        < Navbar role='professional' />
        <div className="flex flex-row">
            <div className="md:w-1/4 w-0">
                < Sidebar />
            </div>
            <div className="mt-12 md:w-3/4 w-full px-3 ml-6 md:ml-0">
            {isVerified && <h2 className="text-lg mb-5 text-amber-950 font-semibold md:ml-10 lg:ml-0">Available Requirements</h2>}
            {isVerified===false &&
            <>
            <img src="/empty.jpg" className="w-72" alt="" />
            <p className="text-[#1d714a] font-thin">Subscribe to get requirements posted by home owners!</p>
            <button onClick={() =>navigate('/professional/subscribe') } className="bg-[#2e9474] px-4 py-2 text-white font-thin tracking-wide mt-6 ">Go to Subscription</button>
            </>
            }
            <div className="max-w-4xl grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {isVerified===true && requirements && requirements.map((val, index) =>
                    <div key={index} className="flex flex-col max-w-xs p-6 my-4 rounded shadow-md bg-[#fdfde599]">
                        <div className="flex flex-col flex-grow">
                        <h5 className="mb-2 text-md text-[#1f6357] font-semibold">
                            {val.service}
                        </h5>
                        <p className="mb-3 text-sm text-gray-700">
                            {val.service == 'Home construction' && `${val.type}- ${val.service} in ${val.rooms} required.`}
                            {val.service == 'Interior design' && `${val.scope}- ${val.service} required.`}
                            {val.service == 'House plan' && `${val.plan}- ${val.service} required.`}
                        </p>
                        <div className="flex flex-col space-y-1 w-72">
                            <p className="text-sm text-gray-700">{val.area}</p>
                            <p className="text-sm text-gray-700">{val.workPeriod}</p>
                            <p className="text-sm text-gray-700">Budget: {val.budget == 'Yes' ? 'Fixed budget' : val.budget}</p>
                            <p className="text-sm text-gray-700">Location:Calicut,Kerala</p>
                            <p className="text-sm text-gray-700">Mobile: {val.mobile}</p>
                        </div>
                        </div>
                       
                    </div >
                )}
            </div>
            </div>
        </div>
        </>
    )
}

export default Requirements
