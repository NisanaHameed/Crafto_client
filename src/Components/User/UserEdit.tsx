import { useState } from "react"
import { editProfile } from "../../Api/user";
import toast from "react-hot-toast";
interface Userdata {
    name: string
    email: string
    city: string
    mobile: string
    image: string
}
interface Prop {
    setShowEdit: Function
    userdata: Userdata
}
const UserEdit: React.FC<Prop> = ({ setShowEdit, userdata }) => {


    const [imagePreview, setImagePreview] = useState(null);
    const [name, setName] = useState(userdata?.name || '');
    const [email, setEmail] = useState(userdata?.email || '');
    const [city, setCity] = useState(userdata?.city || '');
    const [mobile, setMobile] = useState(userdata?.mobile || '');
    const [image, setImage] = useState(userdata?.image || null);

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

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('city', city);
            formData.append('mobile', mobile);
            if (image) {
                formData.append('image', image);
            }
            console.log(formData)
            let res = await editProfile(formData);
            if (res?.data.success) {
                toast.success('Profile edited!');
                setShowEdit(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="md:w-3/6 w-5/6 flex mx-auto rounded shadow-lg p-8 mt-12">
            <div className="flex flex-col md:flex-row w-full">
                <div className="md:w-1/2 w-2/2 md:mr-9">
                    <img
                        className="w-24 h-24 mb-6 object-cover mx-auto rounded-full"
                        src={imagePreview ? imagePreview : userdata?.image}
                        alt="No photo"
                    />
                    <input type="file" onChange={handleImageChange} className="w-full mb-5 border border-gray-300 rounded-md focus:ring-[#007562] focus:border-[#007562] block " accept="image/*" />
                </div>
                <div className="md:w-1/2 w-2/2" >
                    <div className="w-full">
                        <label className="text-sm text-gray-500">Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="w-full border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562]  p-2.5" />
                    </div>
                    <div className="w-full">
                        <label className="text-sm text-gray-500">Email</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="w-full border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562]  p-2.5" />
                    </div>
                    <div className="w-full">
                        <label className="text-sm text-gray-500">City</label>
                        <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="w-full border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562]  p-2.5" />
                    </div>
                    <div className="w-full">
                        <label className="text-sm text-gray-500">Mobile</label>
                        <input type="number" onChange={(e) => setMobile(e.target.value)} value={mobile} className="w-full border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562]  p-2.5" />
                    </div>
                    <div className="w-full mx-auto">
                        <button onClick={handleSubmit} className="mt-5 mr-5 w-24 py-2 px-5 font-semibold rounded border border-[#007562] hover:text-[#007562] text-white bg-[#007562] hover:bg-white cursor-pointer">Edit</button>
                        <button onClick={() => setShowEdit(false)} className="mt-5 w-24 py-2 px-5 font-semibold rounded border border-[#007562] text-[#007562] hover:text-white hover:bg-[#007562] cursor-pointer">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserEdit
