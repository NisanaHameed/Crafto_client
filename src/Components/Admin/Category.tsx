import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCategory, addCategory } from "../../Api/admin";
import { useNavigate } from "react-router-dom";

interface Category {
    name: string,
    image: string
}

const Category = () => {

    const [rerender, setRerender] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCategory();
                if (data) {
                    console.log(data)
                    setCategory(res?.data.categories);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [rerender])

    const [category, setCategory] = useState<Category[]>([]);
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        image: null
    });
    const navigate = useNavigate();

    const handleImageChange = (e: any) => {

        const file = e.target.files[0];
        if (file) {
            setData({ ...data, image: file });
            const reader: any = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!data.name.trim().length) {
            toast.error('Enter a valid name');
            return;
        } else if (!data.image) {
            toast.error('Upload image');
            return;
        }

        let formData = new FormData();
        formData.append('name', data.name);
        formData.append('image', data.image);

        let res = await addCategory(formData);
        if (res?.data.success) {
            toast.success('Category added!');
            setRerender(prevstate => !prevstate);
            console.log(rerender);
            navigate('/admin/category');
        }
    }


    return (
        <div className="p-4 sm:ml-64">
            <h2 className="font-semibold text-[#236627] text-xl py-5">Category</h2>
            <div>

                {/* Modal toggle */}
                <button
                    data-modal-target="crud-modal"
                    data-modal-toggle="crud-modal"
                    className="block text-white bg-[#007562] hover:bg-white hover:text-[#007562] hover:border hover:border-[#007562] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    type="button"
                >
                    Add Category
                </button>
                {/* Main modal */}
                <div
                    id="crud-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full ">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Add New Category
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    data-modal-toggle="crud-modal"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div>
                                {image? <img src={image} className="object-cover w-full h- p-4" alt="" />:
                                <img src='/homeicon.png' className="object-cover w-28 h- p-4 mx-auto" alt="" />}
                            </div>
                            {/* Modal body */}
                            <form className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            placeholder="Type category name"
                                            required
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="price"
                                            className="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Upload image
                                        </label>
                                        <input type="file" className="border border-gray-30 block w-full p-2 rounded-md" accept="image/*" onChange={handleImageChange} />
                                    </div>

                                </div>
                                <button
                                    type="submit"
                                    className="relative inline-flex items-center justify-center p-2.5 mb-2 me-2 overflow-hidden text-md font-medium text-gray-700 rounded-lg group bg-gradient-to-br from-green-500 to-gray-400 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                                    onClick={handleSubmit}
                                >
                                    <svg
                                        className="me-1 -ms-1 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Add new category
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <div className="relative overflow-x-auto">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-7">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                category name
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((val, index) => {
                            return (
                                <tr className="bg-white border-b" key={index}>
                                    <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                        <img src={val.image} alt="" className="w-24 h-16 object-cover rounded-sm" />

                                    </th>
                                    <td className="px-6 py-4">
                                        {val.name}
                                    </td>
                                    <td>
                                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-700 rounded-md group bg-gradient-to-br from-green-500 to-gray-400 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-700 ">
                                            <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                                Edit
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>


                </table>
            </div>

        </div>
    )
}

export default Category
