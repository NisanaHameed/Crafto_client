import { useEffect, useState } from "react";
import { getUsers,blockUser } from "../../Api/admin";

interface User {
    _id:string;
    name: string;
    email: string;
    mobile: number;
    isBlocked:Boolean
}

const User = () => {

    const [users, setUsers] = useState<User[]>([])
    const [blocked,setBlocked] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                const res = response;
                console.log(res);
                if (res) {
                    setUsers(res.data.users);
                    console.log('users' + users)
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [blocked])

    const hadleBlocking = async (id:string)=>{
        let res:any = await blockUser(id);
        if(res.data.success){
            setBlocked(!blocked)
        }
    }

    return (

        <div className="p-4 sm:ml-64">

            <div className="relative overflow-x-auto">
                <h2 className="font-semibold text-[#236627] text-xl ml-5">Users</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-7">
                    <thead className="text-xs text-gray-700 uppercase bg-[#f3edd988]">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((val, index) => {
                            return (
                                <tr className="bg-white border-b" key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                                        {val.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {val.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {val.mobile}
                                    </td>
                                    <td>
                                        <button onClick={()=>hadleBlocking(val._id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-700 rounded-md group bg-gradient-to-br from-green-500 to-gray-400 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-700 ">
                                            <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white rounded group-hover:bg-opacity-0">
                                                {val.isBlocked ? 'Unblock': 'Block'}
                                            </span>
                                        </button>
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

export default User;