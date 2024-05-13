import { useEffect, useRef, useState } from "react"
import { postRequirement } from "../../Api/user"
import toast from "react-hot-toast"
import RequirementModal from "./RequirementModal"
import { io, Socket } from "socket.io-client"
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { auth } from '../../Services/Config/firebase'
import { ConfirmationResult } from "firebase/auth"

interface IState {
    setState: Function
}

const RequirementForm1: React.FC<IState> = ({ setState }) => {
    const [data, setData] = useState({
        service: 'Home construction',
        type: '',
        rooms: '',
        area: '',
        budget: '',
        workPeriod: '',
        mobile: '+91 '
    })
    const [successModal, setSuccessModal] = useState(false);
    const [showMobileDiv, setShowMobileDiv] = useState(false);
    const [otp, setOtp] = useState('');
    const [user, setUser] = useState<ConfirmationResult>();
    const socket = useRef<Socket | undefined>()

    useEffect(() => {
        socket.current = io("ws://localhost:3000");
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!data.type) {
            toast.error('Select type');
            return;
        } else if (!data.rooms) {
            toast.error('Select rooms!');
            return;
        } else if (!data.area) {
            toast.error('Select area!');
            return;
        } else if (!data.budget) {
            toast.error('Select budget!');
            return;
        } else if (!data.workPeriod) {
            toast.error('Select work period!');
            return;
        }
        console.log('submit button clicked');
        setShowMobileDiv(true)

    }

    const sendOtp = async () => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {})
            const confirmation = await signInWithPhoneNumber(auth, data.mobile, recaptcha);
            setUser(confirmation)
        } catch (err) {
            console.log(err);
        }
    }

    const verifyOtp = async () => {
        try {
            const result = await user?.confirm(otp);
            
            if (result) {
                const res = await postRequirement(data);
                socket.current?.emit('pushNotification', {
                    requirement: res?.data.requirement,
                    message: 'You have a requirement, check details!'
                })
                if (res?.data.success) {
                    toast.success('Requirement posted successfully!');
                    setSuccessModal(true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="md:w-3/6 w-5/6 mx-auto rounded shadow-lg p-9 py-14 mt-12 space-y-2">
            {!showMobileDiv ?
                <>
                    <select value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })} className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                        <option selected className="">Please specify the nature of service you need</option>
                        <option>Full house</option>
                        <option>Renovation</option>
                        <option>Other</option>
                    </select>
                    <select value={data.rooms} onChange={(e) => setData({ ...data, rooms: e.target.value })} className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                        <option selected className="">How many bedrooms?</option>
                        <option>2BHK</option>
                        <option>3BHK</option>
                        <option>4BHK</option>
                        <option>more than 4BHK</option>
                    </select>
                    <select value={data.area} onChange={(e) => setData({ ...data, area: e.target.value })} className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                        <option selected className="">Select area</option>
                        <option>100-500 sqft</option>
                        <option>501-1000 sqft</option>
                        <option>1001-2500 sqft</option>
                        <option>2501-5000 sqft</option>
                        <option>More than 5000 sqft</option>
                    </select>
                    <select value={data.budget} onChange={(e) => setData({ ...data, budget: e.target.value })} className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                        <option selected className="">Do you have an approximate budget?</option>
                        <option>Yes</option>
                        <option>Budget is flexible</option>
                    </select>
                    <select value={data.workPeriod} onChange={(e) => setData({ ...data, workPeriod: e.target.value })} className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                        <option selected className="">When is the work planned?</option>
                        <option>Within 1 month</option>
                        <option>In 3 months</option>
                        <option>In 6 months</option>
                        <option>In 1 year</option>
                    </select>
                    {/* <select value='' className="bg-gray-50 text-gray-500 border border-gray-300 text-sm rounded-md focus:ring-[#007562] focus:border-[#007562] block w-4/5 mx-auto p-2.5">
                    <option selected className="">Select your site location</option>
                    </select> */}
                    <div className="flex justify-center pt-7 space-x-1">
                        <button onClick={handleSubmit} className="bg-[#2e9474] px-4 py-2 text-white font-thin tracking-wide">Submit</button>
                        <button onClick={() => setState('Form')} className="bg-[#2e9474] px-4 py-2 text-white font-thin tracking-wide">Back</button>
                    </div>
                </>
                :
                <div className="flex flex-col justify-center items-center">
                    <h2 className="pb-3 text-gray-700">Enter your mobile number</h2>
                    <input type="text" className="p-2 w-1/2" value={data.mobile} onChange={(e) => setData({ ...data, mobile: e.target.value })} />
                    <button onClick={sendOtp} className="bg-[#2e9474] px-4 py-2 text-white font-thin tracking-wide mt-2 hover:bg-[#1d785b]">Send OTP</button>
                    <div className="my-3" id='recaptcha'></div>
                    <input type="text" className="w-1/2 p-2" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <button onClick={verifyOtp} className="bg-[#2e9474] px-4 py-2 text-white font-thin tracking-wide mt-2 hover:bg-[#1d785b]">Verify OTP</button>
                </div>
            }
            {successModal && < RequirementModal requirement={data} />}
        </div>
    )
}

export default RequirementForm1
