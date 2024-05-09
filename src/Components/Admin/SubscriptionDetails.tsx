import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { subscriptionDetails } from "../../Api/admin";

interface IPlan {
    planType: string;
    amount: number;
}
interface ISubscription {
    profId?: {
        firstname: string
        lastname: string
        email: string
    }
    subscriptionId: string
    plan: IPlan
    status: string
    startDate: string
    endDate: string
    createdAt: string
}
const SubscriptionDetails = () => {

    const [subscription, setSubscription] = useState<ISubscription>();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await subscriptionDetails(id as string);
            console.log(res);
            if (res?.data.success) {
                setSubscription(res.data.subscription);
            }
        }
        fetchData();
    }, [])

    const formatDate = (dateString:string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit'  
        });
    };

    return (
        <div className="p-4 sm:ml-64">

            <div className="relative overflow-x-auto">
                {/* <h2 className="font-semibold text-[#236627] text-xl mt-5">Subscriptions</h2> */}
                <h2 className="text-[#236627] text-xl my-5 py-2 font-semibold border-b-[1px]">{subscription?.profId?.firstname} {subscription?.profId?.lastname}
                <span className="block pt-1 text-sm font-normal text-green-950">{subscription?.profId?.email}</span>
                </h2>
                <div className="w-96 border rounded p-10 space-y-2">
                    <h2 className="text-3xl font-semibold mb-4">Rs {subscription?.plan.amount}<span className="text-sm font-light"> {subscription?.plan.planType=='Yearly'? '/ Year' : '/ Month'}</span></h2>
                    {subscription?.status=='Active' ?
                    <a className="mt-4 px-3 py-[1px] rounded-full text-sm bg-green-800 text-white">Active</a>
                    :
                    <a className="mt-4 px-3 py-[1px] rounded-full text-sm bg-gray-300">Cancelled</a>
                    }
                    <ul className="flex space-x-10 pt-3">
                        <li>Start Date<span className="block text-sm font-light">{formatDate(subscription?.startDate as string)}</span></li>
                        <li>End Date<span className="block text-sm font-light">{formatDate(subscription?.endDate as string)}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionDetails
