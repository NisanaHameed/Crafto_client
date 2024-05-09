import React, { useState } from "react"
import { forgotPassword } from "../../Api/user";
import { forgotPasswordProf } from "../../Api/professional";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface IRole {
  role: 'user' | 'professional'
}

const ForgotPassword: React.FC<IRole> = ({ role }) => {

  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    if (!emailPattern.test(email)) {
      toast("Enter a valid email!");
      return
    }
    console.log('role.....', role)
    if (role === 'user') {
      const res = await forgotPassword(email);
      if (res?.data.success) {
        navigate('/forgotPasswordOTP');
      }
    } else {
      const res = await forgotPasswordProf(email);
      if (res?.data.success) {
        navigate('/professional/forgotPasswordOTP');
      }
    }
  }

  return (
    <>
      <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
        <div className="mt-36 bg-white  rounded-xl shadow-lg">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-light text-green-800">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600 ">
                Remember your password?
                <a
                  className="text-green-800 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  Login here
                </a>
              </p>
            </div>
            <div className="mt-5">
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm ml-1 mb-2 "
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm shadow-sm"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to you
                  </p>
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#007562] text-white hover:bg-[#285c53] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
                >
                  Reset password
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>

  )
}

export default ForgotPassword
