import { useEffect, useRef, useState } from "react"
import { resendOtpProf, verifyEmailOtp, verifyOTP } from "../../Api/professional"
import { resendOtp, verifyOtp } from "../../Api/user"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setUserCredential } from "../../Store/Slice/AuthSlice"
import toast from "react-hot-toast"

interface OtpProps {
    role: 'user' | 'professional'
    signup: Boolean
}

const Otp: React.FC<OtpProps> = ({ role, signup }) => {
    console.log(role);

    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const [otp, setOtp] = useState({
        digitOne: "",
        digitTwo: "",
        digitThree: "",
        digitFour: ""
    });
    const [timeLeft, setTimeLeft] = useState(60);
    const [showResend, setShowResend] = useState(false);

    useEffect(() => {
        if (inputRef.current[0]) {
            inputRef.current[0].focus()
        }
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1)
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setShowResend(true);
        }
    }, [timeLeft]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let { name, value } = event.target;
        value = value.replace(/\D/g, '');

        setOtp(prev => ({
            ...prev,
            [name]: value.slice(-1)
        }))

        if (value && index < 3) {
            inputRef.current[index + 1]!.focus();
        }
    }

    const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace" && index > 0) {
            inputRef.current[index - 1]!.focus()
        }
    }

    const renderInput = () => {

        return Object.keys(otp).map((keys, index) => (
            <input
                key={index}
                ref={(element) => (inputRef.current[index] = element)}
                type="text"
                value={otp[keys as keyof typeof otp] || ''}
                name={keys}
                className="w-14 h-11 rounded-md mr-3 text-center text-xl border border-[#007562] text-black-50"
                onChange={(event) => handleChange(event, index)}
                onKeyUp={(event) => handleBackspace(event, index)}
            />
        ))
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        try {
            console.log('role...',role)
            if (role === 'user' && signup) {
                console.log('in user')
                let num = otp.digitOne + otp.digitTwo + otp.digitThree + otp.digitFour
                let res = await verifyOtp(num);
                if (res?.data.success) {
                    dispatch(setUserCredential(res.data.token));
                    navigate('/')
                }
            } else if (role === 'professional' && signup) {
                console.log('in prof')
                let res = await verifyOTP(otp.digitOne + otp.digitTwo + otp.digitThree + otp.digitFour);
                if (res?.data.success) {
                    navigate('/professional/fillProfile')
                }
            } else if(!signup) {
                let res = await verifyEmailOtp(otp.digitOne + otp.digitTwo + otp.digitThree + otp.digitFour);
                if (res?.data.success) {
                    toast.success('Email updated!');
                    navigate('/professional/editProfile');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleResendOtp = async () => {
        if (role === 'user' && signup) {
            let res = await resendOtp();
            if (res?.data.success) {
                setTimeLeft(30);
                setShowResend(false);
            }
        } else if (role === 'professional' && signup) {
            let res = await resendOtpProf();
            if (res?.data.success) {
                setTimeLeft(30);
                setShowResend(false);
            }
        }
    }

    return (
        <>
            <section className=" h-screen flex items-center justify-center">

                <div className="flex p-10 flex-wrap items-center justify-center border shadow-lg rounded">
                    <form action="">
                        <h3 className="text-lg mb-8 ml-16">Please enter otp</h3>
                        <div>
                            {renderInput()}
                        </div>
                        {showResend ?
                            <button onClick={handleResendOtp} className="ml-16 mt-5 w-32 h-10 text-lg text-white font-semibold border border-solid bg-[#007562] rounded hover:bg-[#10574b]">Resend OTP</button>
                            :
                            <button onClick={handleSubmit} className="ml-16 mt-5 w-32 h-10 text-lg text-white font-semibold border border-solid bg-[#007562] rounded hover:bg-[#10574b]">Submit</button>
                        }
                        {timeLeft > 0 && !showResend && (
                            <p className="mt-2 text-center text-xl">{formatTime(timeLeft)}</p>
                        )}

                    </form>
                </div>
            </section>
        </>
    )
}

export default Otp;
