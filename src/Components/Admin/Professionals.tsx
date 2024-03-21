import { useEffect, useState } from "react";
import { blockProfessional, getProfessionals } from "../../Api/admin";

interface Professional {
    _id:string;
    firstname: string;
    lastname: string;
    email: string;
    city: string;
    job: string;
    company: string;
    experience: number;
    bio: string;
    isBlocked: Boolean
}

const Professional = () => {

    const [profs, setProfs] = useState<Professional[]>([])
    const [blocked,setBlocked] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getProfessionals();
                const { data } = response;
                console.log(data);
                if (data) {
                    setProfs(data.profs);
                    console.log('profs' + profs)
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [blocked])

    const hadleBlocking = async (id:string)=>{
        let res:any = await blockProfessional(id);
        if(res.data.success){
            setBlocked(!blocked);
        }
        
    }

    return (

        <div className="p-4 sm:ml-64">

            <div className="relative overflow-x-auto">
                <h2 className="font-semibold text-[#236627] text-xl ml-5">Professionals</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-7">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                City
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Job
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                Company
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Experience
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Bio
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {profs.map((val, index) => {
                            return (
                                <tr className="bg-white border-b" id={index.toString()}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                                        {`${val.firstname} ${val.lastname}`}
                                    </th>
                                    <td className="px-6 py-4">
                                        {val.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {val.city}
                                    </td>
                                    <td className="px-6 py-4">
                                        {val.job}
                                    </td>
                                    <td>
                                        <button onClick={() => hadleBlocking(val._id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-700 rounded-lg group bg-gradient-to-br from-green-500 to-gray-400 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                            <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                                {val.isBlocked ? 'Unblock' : 'Block'}
                                            </span>
                                        </button>
                                    </td>
                                    {/* <td className="px-6 py-4">
                                {val.company}
                            </td>
                            <td className="px-6 py-4">
                                {val.experience}
                            </td>
                            <td className="px-6 py-4">
                                {val.bio}
                            </td> */}
                                </tr>
                            )
                        })}
                    </tbody>


                </table>
            </div>

        </div>
    )
}

export default Professional;