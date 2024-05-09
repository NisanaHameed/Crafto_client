import { useEffect, useState } from "react"
import { getSubscriptions } from "../../Api/admin";
import { useNavigate } from "react-router-dom";

interface IPlan {
    planType: string;
    amount: number;
}
interface ISubscription {
    profId?: {
        _id:string
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
const Subscriptions = () => {

    const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
    const [filteredData, setFilteredData] = useState<ISubscription[]>([]);
    const [tab, setTab] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getSubscriptions();
            if (res?.data.success) {
                setFilteredData(res.data.subscriptions);
                setSubscriptions(res.data.subscriptions);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (tab == 'Active') {
            let data = subscriptions.filter((val: ISubscription) =>
                val.status === 'Active'
            )
            setFilteredData(data);
        } else if (tab == 'Cancelled') {
            let data = subscriptions.filter((val: ISubscription) =>
                val.status === 'Cancelled'
            )
            setFilteredData(data);
        } else if (tab == 'All') {
            setFilteredData(subscriptions);
        }

    }, [tab])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="p-4 sm:ml-64">

            <div className="relative overflow-x-auto">
                <h2 className="font-semibold text-[#236627] text-xl mt-5">Subscriptions</h2>
                <div className="flex my-5 gap-2">
                <button onClick={() => setTab('All')} className={`border ${tab == 'All' ? 'border-green-700 border-2 font-medium' : 'border-gray-400'} text-green-700 tracking-wide text-start pl-3 py-2 font-light rounded w-40`}>All</button>
                    <button onClick={() => setTab('Active')} className={`border ${tab == 'Active' ? 'border-green-700 border-2 font-medium' : 'border-gray-400'} text-green-700 tracking-wide text-start pl-3 py-2 font-light rounded w-40`}>Active</button>
                    <button onClick={() => setTab('Cancelled')} className={`border ${tab == 'Cancelled' ? 'border-green-700 border-2 font-medium' : 'border-gray-400'} text-green-700 tracking-wide text-start pl-3 py-2 font-light rounded w-40`}>Cancelled</button> 
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-7">
                    <thead className="text-xs text-gray-700 uppercase bg-[#f3edd988]">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Cutomer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Plan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData && filteredData.map((val, index) => {
                            return (
                                <tr onClick={()=>navigate(`/admin/subscriptionDetails/${val.profId?._id}`)} className="bg-white border-b cursor-pointer" key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                                        {val.profId?.firstname} {val.profId?.lastname}
                                    </th>
                                    <td className="px-6 py-4">
                                        {val.status}
                                    </td>
                                    <td className="px-6 py-4">
                                        {val.plan.planType}
                                    </td>
                                    <td>
                                        {formatDate(val.createdAt)}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Subscriptions
