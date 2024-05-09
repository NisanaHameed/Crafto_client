import { useNavigate } from "react-router-dom"

const SuccessPayment = () => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-72 shadow-xl">
        <img src="/success.png" className="mt-6 w-20 mx-auto" alt="" />
        <h2 className="py-8 text-lg text-green-800 text-center">Subscription Successfull!</h2>
        <button onClick={()=>navigate('/professional/profile')} className="bg-[#1b8f7c] px-3 py-2 mb-14 w-1/2 mx-auto text-white font-light tracking-wide">Go Home</button>
      </div>
    </div>
  )
}

export default SuccessPayment
