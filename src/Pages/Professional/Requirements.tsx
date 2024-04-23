import { useEffect, useState } from "react"
import Sidebar from "../../Components/Professional/Sidebar"
import { getRequirements } from "../../Api/professional"
import Navbar from "../../Components/common/Navbar"

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
    status: string
}

const Requirements = () => {

    const [requirements,setRequirements] = useState<IRequirement[]>([])

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
            <div className="md:w-1/4">
                < Sidebar />
            </div>
            <div className="mt-10 md:w-3/4 w-full px-3">
            <h2 className="text-lg mb-5 text-amber-950 font-semibold md:ml-10 lg:ml-0">Available Requirements</h2>
            <div className="max-w-4xl grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {requirements && requirements.map((val, index) =>
                    <div key={index} className="flex flex-col max-w-xs p-6 my-4 border rounded shadow-md">
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
