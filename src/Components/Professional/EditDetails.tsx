import { useState, useEffect } from "react"
import { getJobrole } from "../../Api/admin";
import { useNavigate } from "react-router-dom";
import { editEmail, editImage, editPassword, editProfile, profProfile } from "../../Api/professional";
import toast from "react-hot-toast";
import Otp from "../common/otp";
interface Jobrole {
    name: string
}
interface Prof {
    firstname: string
    lastname: string
    email: string
    city: string
    job: string
    experience: number
    company: string
    bio: string
    image: string
    followers: number
}
const EditDetails = () => {
    const [jobroles, setJobroles] = useState<Jobrole[]>([])
    const [userData, setUserData] = useState<Prof>();
    const [imagePreview, setImagePreview] = useState(null);
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        city: '',
        email: '',
        job: '',
        company: '',
        experience: 0,
        bio: '',
        image: '/profile.png'
    })
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmtPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobroles = async () => {
            try {
                const { data } = await getJobrole();
                const profileResponse = await profProfile();
                let userdata = profileResponse.data.profdata
                setUserData(userdata);
                if (data) {
                    setJobroles(data.jobroles);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchJobroles();

    }, [])
    useEffect(() => {
        if (userData) {
            setData({
                firstname: userData.firstname,
                lastname: userData.lastname,
                city: userData.city,
                email: userData.email,
                job: userData.job,
                company: userData.company,
                experience: userData.experience,
                bio: userData.bio,
                image: userData.image
            });
        }
    }, [userData])

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setData({ ...data, image: file });
            const reader: any = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleEditProfile = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!data.firstname.trim().length) {
            toast.error('Enter firstname!');
            return;
        } else if (!data.lastname.trim().length) {
            toast.error('Enter lastname!');
            return;
        } else if (!data.city.trim().length) {
            toast.error('Enter city!');
            return;
        } else if (!data.job.trim().length) {
            toast.error('Enter job!');
            return;
        } else if (!data.company.trim().length) {
            toast.error('Enter company!');
            return;
        } else if (data.experience < 0) {
            toast.error('Enter valid experience!');
            return;
        } else if (!data.bio.trim().length) {
            toast.error('Enter bio!');
            return;
        }

        const response = await editProfile(data.firstname, data.lastname, data.city, data.company, data.job, data.experience, data.bio);
        if (response.data.success) {
            toast.success('Profile edited!');
        }
    }

    const handleEditImage = async () => {
        let formdata = new FormData();
        formdata.append('image', data.image);
        const response = await editImage(formdata);
        if (response.data.success) {
            toast.success('Image updated!');
        }
    }

    const handleEditEmail = async (e: any) => {
        e.preventDefault();
        if (data.email === userData?.email) {
            return;
        } else {
            const response = await editEmail(data.email);
            if (response.data.success) {
                // <Otp role="professional" />
            }
        }
    }

    const handleEditPassword = async (e: any) => {
        e.preventDefault();
        if(!currentPassword.trim().length){
            toast.error('Enter current password!');
            return;
        }else if(!newPassword.trim().length || !confirmtPassword.trim().length){
            toast.error('Enter valid password');
            return;
        }else if(newPassword!==confirmtPassword){
            toast.error('Password is not matching!');
            return;
        }

        const response = await editPassword(newPassword,currentPassword);
        if(response.data.success){
            toast.success('Password updated!');
        }
    }

    return (
        <div className="md:w-4/6 w-5/6 p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg flex md:flex-row flex-col mx-auto mt-4">
            <div className="md:w-1/2 w-full md:mr-7">
                <img className="w-28 h-28 rounded-full bg-gray-300 mx-auto object-cover" src={imagePreview ? imagePreview : data.image} alt="Profile picture " />
                <div className="mt-4 mb-3">
                    <label className="block text-sm mt-5 font-medium text-gray-500 mr-5">Change image</label>
                    <input onChange={handleImageChange} type="file" className="border border-gray-30 w-2/3 rounded-md mt-2" accept="image/*" />
                    <img onClick={handleEditImage} src="/tick.png" className="w-9 h-9 shadow-lg border inline cursor-pointer" alt="" />
                </div>
                <div className="w-full mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-500 ">Change email</label>
                    <input onChange={(e) => setData({ ...data, email: e.target.value })} value={data.email} type="text" className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] w-2/3 p-2.5 " required />
                    <img onClick={handleEditEmail} src="/tick.png" className="w-9 h-9 shadow-lg border inline cursor-pointer" />
                </div>
                <button data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal" className="mt-5 mb-5 mr-5 w-2/3 py-2 px-5 font-semibold rounded border border-[#007562] hover:text-[#007562] text-white bg-[#007562] hover:bg-white cursor-pointer">Change password</button>
            </div>
            <div className="md:w-1/2 w-full space-y-4 md:space-y-3" >

                <div className="flex">
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-gray-500 ">First Name</label>
                        <input onChange={(e) => setData({ ...data, firstname: e.target.value })} value={data.firstname} type="text" className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5 " required />
                    </div>
                    <div className="flex-1 ml-4">
                        <label className="block mb-2 text-sm font-medium text-gray-500 ">Last Name</label>
                        <input onChange={(e) => setData({ ...data, lastname: e.target.value })} value={data.lastname} type="text" className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5" required />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 ">City</label>
                    <input type="text" value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5" required />
                </div>

                <div className="flex">
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-gray-500 ">Job</label>
                        <select id="countries" onChange={(e) => setData({ ...data, job: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5">
                            <option selected>Choose a jobrole</option>
                            {jobroles.map((val, index) => {
                                return (
                                    <option key={index} value="US">{val.name}</option>
                                )
                            })}

                        </select>
                    </div>
                    <div className="flex-1 ml-4">
                        <label className="block mb-2 text-sm font-medium text-gray-500 ">Experience</label>
                        <input type="number" value={data.experience} onChange={(e) => setData({ ...data, experience: parseInt(e.target.value) })} className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5" required />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 ">Company</label>
                    <input type="text" value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })} className=" border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-500 ">Bio</label>
                    <textarea value={data.bio} rows={5} onChange={(e) => setData({ ...data, bio: e.target.value })} className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5" required ></textarea>
                </div>

                <div className="mt-16">
                    <button onClick={handleEditProfile} className="mt-5 mr-5 w-24 py-2 px-5 font-semibold rounded border border-[#007562] hover:text-[#007562] text-white bg-[#007562] hover:bg-white cursor-pointer">Edit</button>
                    <button onClick={() => navigate('/professional/profile')} className="mt-5 w-24 py-2 px-5 font-semibold rounded border border-[#007562] text-[#007562] hover:text-white hover:bg-[#007562] cursor-pointer">Cancel</button>
                </div>

                <p className="text-sm font-light text-gray-700 dark:text-gray-400">

                </p>
            </div>

            <>
                {/* Main modal */}
                <div
                    id="authentication-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded shadow py-8 px-4">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Change password
                                </h3>
                                <button
                                    type="button"
                                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    data-modal-hide="authentication-modal"
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
                            {/* Modal body */}
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" action="#">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-500"
                                        >
                                            Current password
                                        </label>
                                        <input
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            value={currentPassword}
                                            type="password"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-500"
                                        >
                                            New password
                                        </label>
                                        <input
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            value={newPassword}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-500"
                                        >
                                            Confirm password
                                        </label>
                                        <input
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            value={confirmtPassword}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required
                                        />
                                    </div>

                                    <button
                                        onClick={handleEditPassword}
                                        type="submit"
                                        className="mt-5 w-full py-2 px-5 font-semibold rounded border border-[#007562] hover:text-[#007562] text-white bg-[#007562] hover:bg-white cursor-pointer "
                                    >
                                        Change
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>


        </div>
    )
}

export default EditDetails
