import { useEffect, useRef, useState } from "react"
import { verifyOTP  } from "../../Api/professional"
import { verifyOtp } from "../../Api/user"
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setProfCredential, setUserCredential } from "../../Store/Slice/AuthSlice"

interface OtpProps{
    role:'user' | 'professional'
}

const Otp:React.FC<OtpProps> = ({role})=> {
console.log(role);

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
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let { name, value } = event.target;

        // if (/[a-z]/gi.test(value)) return;
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

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        event.preventDefault();
        try{
            if(role=='user'){
                console.log('in user')
                let num = otp.digitOne+otp.digitTwo+otp.digitThree+otp.digitFour
                let res = await verifyOtp(num);
                if(res.data.success){
                    dispatch(setUserCredential(res.data.token));
                    navigate('/')
                }
            }else if(role=='professional'){
                console.log('in prof')
                let res = await verifyOTP(otp.digitOne+otp.digitTwo+otp.digitThree+otp.digitFour);
                if(res.data.success){
                    dispatch(setProfCredential(res.data.token));
                    navigate('/professional/fillProfile')
                }
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <section className="bg-white white:bg-white-900 h-screen flex items-center justify-center">
            <div className="flex p-10 flex-wrap items-center justify-center border border-gray-400 rounded">
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

export default Otp;
