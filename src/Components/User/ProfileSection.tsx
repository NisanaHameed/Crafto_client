import { useEffect, useState } from "react"
import UserEdit from "./UserEdit"
import { userProfile } from "../../Api/user";

interface Userdata{
    name:string
    email:string
    city:string
    mobile:number
    image:string
}

const ProfileSection = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [userdata,setUserdata] = useState<Userdata>()
    useEffect(()=>{
        let fetchData = async ()=>{
            let {data} = await userProfile();
            setUserdata(data.userdata);
        }
        fetchData();
    },[])
    return (
        <>
            {showEdit == false && (
                <div className="w-full max-w-sm md:max-w-lg mt-16 bg-white shadow-lg py-8 rounded mx-auto">

                    <div className="flex flex-col items-center pb-10 ">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={userdata?.image} alt="Bonnie image" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{userdata?.name}</h5>
                        <span className="text-sm text-gray-500">{userdata?.email}</span>
                        <span className="text-sm text-gray-500">{userdata?.city}</span>
                        <span className="text-sm text-gray-500">{userdata?.mobile}</span>
                        <div className="flex mt-4 md:mt-6">
                            <a onClick={() => setShowEdit(true)} className="inline-flex items-center px-6 py-2 text-sm font-medium text-center border hover:border-[#007562] hover:text-[#007562] hover:bg-white rounded bg-[#007562] text-white focus:ring-4 focus:outline-none focus:ring-green-800 cursor-pointer">Edit</a>
                        </div>
                    </div>
                </div>)}
            {showEdit && userdata && < UserEdit setShowEdit={setShowEdit} userdata={userdata} />}
        </>
    )
}

export default ProfileSection
