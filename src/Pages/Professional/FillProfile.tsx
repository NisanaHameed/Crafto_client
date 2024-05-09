import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { fillProfile } from '../../Api/professional'
import { getJobrole } from "../../Api/admin"
import { useDispatch } from "react-redux"
import { setProfCredential } from "../../Store/Slice/AuthSlice"
import toast from "react-hot-toast"

interface Jobrole {
    name: string
}

const FillProfile = () => {

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        city: '',
        job: '',
        company: '',
        experience: 0,
        bio: '',
        image: null
    })
    const [jobroles, setJobroles] = useState<Jobrole[]>([])

    useEffect(() => {
        const fetchJobroles = async () => {
            try {
                const res = await getJobrole();
                console.log(data)
                if (data) {
                    setJobroles(res?.data.jobroles);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchJobroles();
    }, [])

    console.log(data.bio)
    console.log(data.firstname)

    const navigate = useNavigate();
    const dispatch = useDispatch();

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


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  
        e.preventDefault();
        const namePattern = /^[a-zA-Z]+$/
        try {
            if (!data.firstname.trim().length || !namePattern.test(data.firstname)) {
                toast.error("Enter a valid firstname!");
                return
            } else if (!data.lastname.trim().length || !namePattern.test(data.lastname)) {
                toast.error("Enter a valid lastname!");
                return;
            } else if (!data.city.trim().length) {
                toast.error("Select city!!");
                return;
            } else if (!data.job.trim().length) {
                toast.error("Select job!");
                return;
            } else if (!data.company.trim().length) {
                toast.error('Enter a valid company name!');
                return;
            } else if (data.experience < 0) {
                toast.error("Enter years of experience!");
                return;
            } else {
                if (!data.bio.trim().length) {
                    toast.error("Type your bio!")
                    return;
                }
            }
            let formData = new FormData();
            formData.append('firstname', data.firstname);
            formData.append('lastname', data.lastname);
            formData.append('city', data.city);
            formData.append('job', data.job);
            formData.append('company', data.company);
            formData.append('experience', String(data.experience));
            formData.append('bio', data.bio);
            console.log(data.image)
            if (data.image) {

                formData.append('image', data.image);
            }

            let res = await fillProfile(formData);
            if (res?.data.success) {
                toast.success("Successfully registered!");
                await dispatch(setProfCredential(res?.data.token));
                navigate('/')
            }
        } catch (err) {
            console.log(err);

        }
    }

    return (
        <section className="bg-white bg-white-900 h-screen flex items-center justify-center">
            <div className="flex flex-wrap justify-center ">
                <div className="w-full flex items-center justify-center">
                    <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 dark:bg-white">
                        <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8 border">
                            <h1 className="text-l font-semibold leading-tight tracking-tight text-gray-900 md:text-xl">
                                Complete Profile
                            </h1>
                            <form className="w-full space-y-4 md:space-y-3" action="#">
                                <div>
                                    <img className="w-28 h-28 rounded-full bg-gray-300 mx-auto object-cover" src={image ? image : '/profile.png'} alt="Profile picture " />

                                </div>
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
                                    <input type="email" value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5" required />
                                </div>

                                <div className="flex">
                                    <div className="flex-1">
                                        <label className="block mb-2 text-sm font-medium text-gray-500 ">Job</label>
                                        <select id="countries" onChange={(e) => setData({ ...data, job: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5">
                                            <option selected>Choose a jobrole</option>
                                            {jobroles.map((val, index) => {
                                                return (
                                                    <option key={index} value={val.name}>{val.name}</option>
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
                                    <textarea value={data.bio} onChange={(e) => setData({ ...data, bio: e.target.value })} className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-full p-2.5" required ></textarea>
                                </div>

                                <div>
                                    <input type="file" className="border border-gray-30 block w-full p-2.5 rounded-md" accept="image/*" onChange={handleImageChange} />
                                </div>

                                <div className="mt-16">
                                    <button type="button" onClick={handleSubmit} className="w-full mt-2 text-white bg-[#007562] hover:bg-[#2a5b53] focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center ">Continue</button>
                                </div>

                                <p className="text-sm font-light text-gray-700 dark:text-gray-400">

                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FillProfile;