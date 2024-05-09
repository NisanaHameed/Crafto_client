import { useEffect, useState } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import { getDashboardDetails } from "../../Api/admin";
import { PieChart, Pie, Tooltip, ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, BarChart, Bar } from "recharts";

interface IData {
    unblockedUsers: number;
    blockedUsers: number;
    unblockedProfs: number;
    blockedProfs: number;
    activeSubscriptions: number;
    cancelledSubscriptions: number;
    totalRevenue: number
}

const Dashboard = () => {

    const [data, setData] = useState<IData>();
    const [data01, setData01] = useState([
        { name: 'Active', value: 0 },
        { name: 'Cancelled', value: 0 },
    ]);
    const [chartData, setChartData] = useState();

    useEffect(() => {

        const fetchData = async () => {
            const res = await getDashboardDetails();
            console.log(res?.data.data);
            setData(res?.data.data);
            setData01([
                { name: 'Active', value: res?.data.data.activeSubscriptions },
                { name: 'Cancelled', value: res?.data.data.cancelledSubscriptions }
            ])
            const revenueByDate = res?.data.data.revenueByDate
            const chartdata = Object.keys(revenueByDate).map(date => ({
                date,
                revenue: revenueByDate[date]
            }))
            chartdata.sort((a: any, b: any) => new Date(a.date) - new Date(b.date));
            console.log('chartdata', chartdata)
            setChartData(chartdata)
            console.log('chartData', chartData)
        }
        fetchData();
    }, [])
    return (
        <>
            <Sidebar />
            <div className="p-6 sm:ml-64">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-6">
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold text-green-800">{data?.unblockedUsers}</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Users</div>
                            </div>
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold text-green-800">{data?.blockedUsers}</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Blocked Users</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-4">
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold text-green-800">{data?.unblockedProfs}</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Professionals</div>
                            </div>
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold text-green-800">{data?.blockedProfs}</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Blocked Professionals</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-6">
                            <div>
                                <div className="text-2xl font-semibold mb-1 text-green-800">Rs {data?.totalRevenue}</div>
                                <div className="text-sm font-medium text-gray-400">Total Revenue</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium text-green-700">Subscriptions</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div className="rounded-md border border-dashed border-gray-200 p-4">
                                <div className="flex items-center mb-0.5">
                                    <div className="text-xl font-semibold text-green-800">{data?.activeSubscriptions}</div>
                                </div>
                                <span className="text-gray-400 text-sm">Active</span>
                            </div>
                            <div className="rounded-md border border-dashed border-gray-200 p-4">
                                <div className="flex items-center mb-0.5">
                                    <div className="text-xl font-semibold text-green-800">{data?.cancelledSubscriptions}</div>
                                </div>
                                <span className="text-gray-400 text-sm">Cancelled</span>
                            </div>
                        </div>
                        <div className="w-full h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={data01}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#82ca9d"
                                        label
                                    />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium text-green-700">Earnings</div>
                            <div className="w-full h-72 mt-20">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={chartData}
                                        margin={{
                                            top: 20, right: 30, left: 20, bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="revenue" fill="#82ca9d" barSize={30} />                                       
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;