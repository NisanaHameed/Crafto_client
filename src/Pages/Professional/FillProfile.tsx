import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { fillProfile } from '../../Api/professional'

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
        image:null
    })
    const [err, setErr] = useState('');

    const navigate = useNavigate();


    const handleImageChange = (e: any) => {

        const file = e.target.files[0];
        if (file) {
            setData({...data,image:file});
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result );
            };
            reader.readAsDataURL(file);
        }
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('submitting....')
        e.preventDefault();
        try {
            if (!data.firstname.trim().length) {
                setErr("Enter firstname!");
                return
            } else if (!data.lastname.trim().length) {
                setErr("Enter lastname!");
                return;
            } else if (!data.city) {
                setErr("Select city!!");
                return err;
            } else if (!data.job) {
                setErr("Select job!");
                return;
            } else if (data.experience<0 ) {
                setErr("Enter years of experience!");
                return;
            } else {
                if (!data.bio.trim().length) {
                    setErr("Type your bio!")
                    return;
                }
            }
            const formData = new FormData();
            formData.append('firstname', data.firstname);
            formData.append('lastname', data.lastname);
            formData.append('city', data.city);
            formData.append('job', data.job);
            formData.append('experience', String(data.experience));
            formData.append('bio', data.bio);
    
            if (data.image) {
                // Check if data.image is not null before appending
                formData.append('image', data.image);
            }
    

            let res = await fillProfile(formData);
            if (res.data.success) {
                console.log('success')
                navigate('/')

            } else {
                setErr(res.data.message);
            }
        } catch (err) {
            console.log(err);

        }
    }

    return (
        <section className="bg-white white:bg-white-900 h-screen flex items-center justify-center">
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
                                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-dark">First Name</label>
                                        <input onChange={(e) => setData({ ...data, firstname: e.target.value })} value={data.firstname} type="text" className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:placeholder-gray-500 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-dark">Last Name</label>
                                        <input onChange={(e) => setData({ ...data, lastname: e.target.value })} value={data.lastname} type="text" className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:placeholder-gray-500 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-dark">City</label>
                                    <input type="email" value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:placeholder-gray-500 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>

                                <div className="flex">
                                    <div className="flex-1">
                                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-dark">Job</label>
                                        <input value={data.job} onChange={(e) => setData({ ...data, job: e.target.value })} type="text" className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:placeholder-gray-500 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-dark">Experience</label>
                                        <input type="number" value={data.experience} onChange={(e) => setData({ ...data, experience: parseInt(e.target.value) })} className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:placeholder-gray-500 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-dark">Company</label>
                                    <input type="text" value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })} className=" border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-dark">Bio</label>
                                    <textarea value={data.bio} onChange={(e) => setData({ ...data, bio: e.target.value })} className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:placeholder-gray-500 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required ></textarea>
                                </div>

                                <div>
                                    <input type="file" className="border border-gray-30 block w-full p-2.5 rounded-md" accept="image/*" onChange={handleImageChange} />
                                </div>

                                <div className="mt-16">
                                    <p>{err}</p>
                                    <button type="button" onClick={handleSubmit} className="w-full mt-2 text-white bg-[#007562] hover:bg-[#2a5b53] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center ">Continue</button>

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