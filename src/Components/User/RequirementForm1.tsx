import { useState } from "react"
import { postRequirement } from "../../Api/user"
import toast from "react-hot-toast"

interface IState{
    setState:Function
}
const RequirementForm1:React.FC<IState> = ({setState}) => {
    const [data, setData] = useState({
        service: 'Home construction',
        type:'',
        rooms: '',
        area: '',
        budget: '',
        workPeriod: ''
    })

    const handleSubmit =async(e:any)=>{
        e.preventDefault();
        if(!data.type){
            toast.error('Select type');
            return;
        }else if(!data.rooms){
            toast.error('Select rooms!');
            return;
        }else if(!data.area){
            toast.error('Select area!');
            return;
        }else if(!data.budget){
            toast.error('Select budget!');
            return;
        }else if(!data.workPeriod){
            toast.error('Select work period!');
            return;
        }

        console.log('submit button clicked')
        const res = await postRequirement(data);
        if(res?.data.success){
            toast.success('Requirement posted successfully!');
            setState('Form');
        }
    }

    return (
        <div className="md:w-3/6 w-5/6 mx-auto rounded shadow-lg p-9 py-14 mt-12 space-y-2">
            <select value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })} className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                <option selected className="">Please specify the nature of service you need</option>
                <option>Full house</option>
                <option>Renovation</option>
                <option>Other</option>
            </select>
            <select value={data.rooms} onChange={(e) => setData({ ...data, rooms: e.target.value })} className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                <option selected className="">How many bedrooms?</option>
                <option>2BHK</option>
                <option>3BHK</option>
                <option>4BHK</option>
                <option>more than 4BHK</option>
            </select>
            <select value={data.area} onChange={(e) => setData({ ...data, area: e.target.value })} className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                <option selected className="">Select area</option>
                <option>100-500 sqft</option>
                <option>501-1000 sqft</option>
                <option>1001-2500 sqft</option>
                <option>2501-5000 sqft</option>
                <option>More than 5000 sqft</option>
            </select>
            <select value={data.budget} onChange={(e) => setData({ ...data, budget: e.target.value })} className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                <option selected className="">Do you have an approximate budget?</option>
                <option>Yes</option>
                <option>Budget is flexible</option>
            </select>
            <select value={data.workPeriod} onChange={(e) => setData({ ...data, workPeriod: e.target.value })} className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                <option selected className="">When is the work planned?</option>
                <option>Within 1 month</option>
                <option>In 3 months</option>
                <option>In 6 months</option>
                <option>In 1 year</option>
            </select>
            {/* <select value='' className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                <option selected className="">Select your site location</option>
                
            </select> */}
            <div className="flex justify-center pt-7 space-x-1">
            <button onClick={handleSubmit} className="w-[150px] inline text-white bg-[#007562] hover:bg-white hover:border border-[#007562] hover:text-[#007562] focus:ring-2 focus:outline-none focus:ring-green-700  font-medium rounded-md text-sm px-5 py-2.5 text-center ">Submit</button>
            <button onClick={()=>setState('Form')} className="w-[150px] inline hover:text-white hover:bg-[#007562] border border-[#007562] text-[#007562] focus:ring-2 focus:outline-none focus:ring-green-700 font-medium rounded-md text-sm px-5 py-2.5 text-center ">Back</button>
            </div>
        </div>

    )
}

export default RequirementForm1