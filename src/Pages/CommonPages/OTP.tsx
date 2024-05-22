import { verifyOTP } from "../../Api/user";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { verifyOtpProf } from "../../Api/professional";

interface IRole {
    role: 'user' | 'professional'
}

const OTP: React.FC<IRole> = ({ role }) => {

    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const [otp, setOtp] = useState({
        digitOne: "",
        digitTwo: "",
        digitThree: "",
        digitFour: ""
    })

    useEffect(() => {
        if (inputRef.current[0]) {
            inputRef.current[0].focus()
        }
    }, [])

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let { name, value } = event.target;

        // if (/[a-z]/gi.test(value)) return;
        value = value.replace(/\D/g, '');

        setOtp((prev: any) => ({
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
        let num = otp.digitOne + otp.digitTwo + otp.digitThree + otp.digitFour
        if (role === 'user') {
            let res = await verifyOTP(num);
            if (res?.data.success) {
                navigate('/changePassword')
            }
        } else {
            let res = await verifyOtpProf(num);
            if (res?.data?.success) {
                navigate('/professional/changePassword');
            }
        }
    }

    return (
        <section className=" h-screen flex items-center justify-center">

            <div className="flex p-10 flex-wrap items-center justify-center border shadow-lg rounded">
                <form action="">
                    <h3 className="text-lg mb-8 ml-16">Please enter otp</h3>
                    <div>
                        {renderInput()}
                    </div>
                    <button onClick={handleSubmit} className="ml-16 mt-5 w-32 h-10 text-lg text-white font-semibold border border-solid bg-[#007562] rounded hover:bg-[#10574b]">Submit</button>
                </form>
            </div>
        </section>
    )
}

export default OTP
