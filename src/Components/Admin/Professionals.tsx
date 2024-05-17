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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 6;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getProfessionals(currentPage, limit);
                const res = response;
                if (res) {
                    setProfs(res.data.profs);
                    setTotalItems(Math.ceil(res?.data.total / limit));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [blocked,currentPage > 1, limit])

    const hadleBlocking = async (id:string)=>{
        let res:any = await blockProfessional(id);
        if(res.data.success){
            setBlocked(!blocked);
        }
        
    }
    const lastPage = Math.ceil(totalItems / limit);

    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (

        <div className="p-4 sm:ml-64">

            <div className="relative overflow-x-auto">
                <h2 className="font-semibold text-[#236627] text-xl ml-5">Professionals</h2>
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
                                <tr className="bg-white border-b" key={index}>
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
                                        <button onClick={() => hadleBlocking(val._id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-700 rounded-md group bg-gradient-to-br from-green-500 to-gray-400 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-700">
                                            <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white rounded group-hover:bg-opacity-0">
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
            <div className="py-5 flex justify-center">
                        <nav aria-label="Page navigation example">
                            <ul className="flex items-center -space-x-px h-8 text-sm">
                                <li>
                                    <button
                                        onClick={() => changePage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg
                                            className="w-2.5 h-2.5 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 1 1 5l4 4"
                                            />
                                        </svg>
                                    </button>
                                </li>
                                {Array.from({ length: totalItems }, (_, index) => index + 1).map((page) => (
                                    <li key={page} >
                                        <a
                                            onClick={() => changePage(page)}
                                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                                        >
                                            {page}
                                        </a>
                                    </li>
                                ))}

                                <li>
                                    <button
                                        onClick={() => changePage(currentPage + 1)}
                                        aria-disabled={currentPage === lastPage}
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg
                                            className="w-2.5 h-2.5 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

        </div>
    )
}

export default Professional;