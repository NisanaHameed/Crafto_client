import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { login } from '../../Api/admin'
import { useDispatch } from "react-redux"
import { setAdminCredential } from "../../Store/Slice/AuthSlice"

const Login = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSubmit = async (e: any) => {
        console.log('admin login submitting....')
        e.preventDefault();
        try {
            if (!emailPattern.test(email)) {
                setErr("Enter a valid email!");
                return
            } else if (password.trim().length < 5) {
                setErr("Password must contain atleast 5 characters!");
                return;
            }
                
                let res = await login(email, password);
                if (res.data.success) {
                    console.log('success')
                    dispatch(setAdminCredential(res.data.token));
                    navigate('/admin')

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

                {/* Image Section */}
                <div className="w-full md:w-1/2 mb-4 md:mb-0 hidden sm:block pr-5">
                    <img src="../../craftoLogo.png" className="w-44 h-auto dark:900 mb-0 p-0" alt="Crafto Logo" />
                    <h1 className="text-brown-100 m-0 p-0">Connect with trusted professionals for your perfect space!</h1>
                    <img src="../../signupic.svg" className="w-60 h-auto align-middle" alt="Beach House" />
                </div>

                {/* Signup Section */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 dark:bg-white">
                    <h1 className="ml-7 text-xl font-normal leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Admin Login
                            </h1>
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                           
                            <form className="space-y-4 md:space-y-3" action="#">

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-dark">Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:placeholder-gray-500 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-dark">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className=" border border-gray-300 text-gray-800 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>

                                <div className="mt-16">
                                    <p>{err}</p>
                                    <button type="button" onClick={handleSubmit} className="w-full mt-2 text-white bg-[#007562] hover:bg-[#2a5b53] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center ">Login</button>
                                    
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
export default Login;