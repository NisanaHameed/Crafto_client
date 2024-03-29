import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { getCategory } from "../../Api/admin";
import { createPost } from "../../Api/professional";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Professional/Sidebar";

interface ICategory {
    name: string,
    image: string
}

const CreatePost = () => {

    const [categories, setCategories] = useState<ICategory[]>([])
    const [imagePreview, setImagePreview] = useState('');
    const [category, setCategory] = useState('');
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [isPortrait, setIsPortrait] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getCategory();
            setCategories(res?.data.categories);
        }
        fetchCategory();
    }, [])

    const handleImageChange = (e: any) => {

        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader: any = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!caption.trim().length) {
            toast.error('Type caption!');
            return;
        } else if (!category.length) {
            toast.error('Select category!');
            return;
        } else if (!image) {
            toast.error('Upload image!');
            return;
        }

        let formData = new FormData();
        formData.append('caption', caption);
        formData.append('category', category);
        formData.append('image', image);
        formData.append('isPortrait', isPortrait.toString());

        let res = await createPost(formData);
        if (res?.data.success) {
            toast.success('Post added successfully!');
            navigate('/professional/profile');
        }

    }
    return (
        <>
            <Sidebar />
            <div className="p-3 flex min-h-screen justify-center md:ml-48 mt-10">
                <div className="lg:w-3/5 md:w-4/5 w-4/5 shadow-lg p-6 h-48 bg-[#007562] rounded">
                    <h1 className="text-center text-gray-100 text-xl mb-6 mt-1 font-semibold">Create post</h1>
                    <div className="flex flex-col gap-4 lg:w-2/3 mx-auto">
                        {imagePreview ? (
                            <div className="h-56">
                                <img src={imagePreview} className="rounded w-full h-full object-cover" alt="" />
                            </div>
                        ) :
                            (
                                <div className="h-56 bg-[#c1c1c1] flex rounded items-center">
                                    <img src='/homeicon.png' className="rounded w-24 mx-auto object-cover" alt="" />
                                </div>
                            )
                        }
                        <div>
                            <textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5" rows={6} required placeholder="Type caption here"></textarea>
                        </div>
                        <div className="w-full flex flex-row space-x-3">
                            <div className="w-1/2">
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5">
                                    <option selected>Choose a Category</option>
                                    {categories.map((val, index) =>
                                    (
                                        <option key={index}>{val.name}</option>
                                    )
                                    )}

                                </select>
                            </div>
                            <div className="w-1/2">
                                <select onChange={(e) => e.target.value == 'Yes' ? setIsPortrait(true) : setIsPortrait(false)} className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5" >
                                    <option selected>Save in portrait?</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <input onChange={handleImageChange} type="file" className="border border-gray-30 block w-full rounded-md text-sm" accept="image/*" />
                        </div>
                        <div className="flex justify-center w-full">
                            <button onClick={handleSubmit} className="bg-[#007562] hover:bg-[#0c5549] text-white font-semibold w-1/3 py-2 m-2 rounded shadow">POST</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatePost
