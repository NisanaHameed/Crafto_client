import { useEffect, useState } from "react";
import { getAllDesigns } from "../../Api/user";
import Navbar from "../../Components/common/Navbar";
import { useNavigate } from "react-router-dom";

interface IDesign {
    _id: string
    image: string
    profId: {
        company: string
        image: string
    }
}
interface IRole {
    role: 'user' | 'professional'
}

const AllDesigns: React.FC<IRole> = ({ role }) => {

    const [design, setDesign] = useState<IDesign[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 8;
    useEffect(() => {
        const fetchPost = async () => {
            const res = await getAllDesigns(currentPage, limit);
            console.log(res)
            setDesign(res?.data?.posts);
            setTotalItems(Math.ceil(res?.data.total / limit));
        }
        fetchPost();
    }, [currentPage > 1, limit])

    const navigate = useNavigate();

    const designDetail = (id: string) => {
        if (role == 'user') {
            navigate(`/postDetail/${id}`);
        } else {
            navigate(`/professional/postDetail/${id}`);
        }
    }
    const lastPage = Math.ceil(totalItems / limit);

    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Navbar role={role} />
            <div className="h-screen w-full">
                <div className=" mt-[70px]">
                    <h2 className="ml-5 mb-5 text-xl font-semibold text-[#007562] md:ml-14">All Designs</h2>
                    <div className="max-w-8xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-5 gap-4 mx-auto">
                        {design.length ? design.map((val, index) => (
                            <div onClick={() => designDetail(val?._id)} key={index} className="max-w-full bg-white rounded-md">
                                <a>
                                    <img className="rounded h-52 lg:h-80 w-full object-cover filter hover:brightness-75 cursor-pointer" src={val.image} alt="" />
                                </a>
                                <div className="py-2">
                                    <a>
                                        <h5 className="lg:text-base md:text-sm text-sm font-normal tracking-tight text-gray-900 cursor-pointer"><img src={val.profId.image} className="w-4 h-4 rounded-full inline object-cover mr-2" />{val.profId?.company}</h5>
                                    </a>
                                </div>
                            </div>
                        ))
                            :
                            <div className='flex flex-col items-center justify-center w-full'>
                                <img className='w-28' src="/emptybox.png" alt="" />
                                <h2 className='py-3 text-green-600'>No Data!</h2>
                            </div>
                        }

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
            </div>

        </>
    )
}

export default AllDesigns