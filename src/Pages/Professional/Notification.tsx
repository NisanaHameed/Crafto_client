import { useEffect, useState } from "react"
import { getNotifications, updateNotification } from "../../Api/professional";
import Sidebar from "../../Components/Professional/Sidebar"
import Navbar from "../../Components/common/Navbar";
import { useNavigate } from "react-router-dom";

interface INotification {
    _id: string
    userId: string,
    message: string,
    category: string,
    createdAt: Date,
    readStatus: Boolean
}

const Notification = () => {

    const [notifications, setNotications] = useState<INotification[]>([])
    const navigate = useNavigate();

    useEffect(() => {

        const fetchNotifications = async () => {
            const res = await getNotifications();
            if (res?.data.success) {
                setNotications(res.data.notifications);
            }
        }
        fetchNotifications();

    }, [])

    const handleClick = async (id:string,category:string,readStatus:Boolean)=>{
        if(readStatus === false) await updateNotification(id);
        if(category=='Requirement'){
            navigate('/professional/requirements')
        }
    }

    return (
        <>
            < Navbar role='professional' />
            <div className="flex flex-row">
                <div className="md:w-1/4 w-0">
                    < Sidebar />
                </div>
                <div className="mt-12 md:w-3/4 w-full px-3 ml-6 md:ml-0">
                    {notifications.length ? 
                    <h2 className="text-lg mb-5 text-amber-950 font-semibold md:ml-10 lg:ml-0">Notifications</h2>
                    :
                    <>
                    <h2 className="font-medium text-sm mb-2 text-[#032e0e99]">NO NOTIFICATIONS</h2>
                    <p className="text-sm font-thin">We will notify you once we have something for you</p>
                    </>
                }
                    
                    {notifications && notifications.map((val) =>
                    (
                        <div onClick={()=>handleClick(val._id,val.category,val.readStatus)} key={val._id} className="relative flex flex-row py-5 w-full md:w-3/4 lg:w-2/4 md:ml-10 lg:ml-0 border mb-3 rounded-md px-4 cursor-pointer">
                            <img src="/requirement.png" className="w-8 mr-4" alt="" />
                            <p className="text-gray-700">{val.message}</p>
                            {val.readStatus === false && <div className="absolute top-2 right-2 w-[10px] h-[9px] bg-[#6ce8c1] rounded-full"></div>}
                        </div>
                    )
                    )}
                </div>
            </div>
        </>
    )
}

export default Notification
