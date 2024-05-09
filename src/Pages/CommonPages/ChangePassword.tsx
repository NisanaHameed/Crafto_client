import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../Api/user";
import { changePasswordProf } from "../../Api/professional";

interface IRole {
    role: 'user' | 'professional'
}

const ChangePassword: React.FC<IRole> = ({ role }) => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmtPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!newPassword.trim().length || !confirmtPassword.trim().length) {
            toast.error('Enter valid password');
            return;
        } else if (newPassword !== confirmtPassword) {
            toast.error('Password is not matching!');
            return;
        }
        if (role === 'user') {
            const response = await changePassword(newPassword);
            if (response?.data.success) {
                toast.success('Password updated!');
                toast.success('Please Login wth new password!')
                navigate('/login');
            }
        } else {
            const response = await changePasswordProf(newPassword);
            if (response?.data?.success) {
                toast.success('Password updated!');
                toast.success('Please Login wth new password!')
                navigate('/login');
            }
        }
    }

    return (
        <div className="flex w-full items-center justify-center">
            <div className="p-7 w-full md:w-1/2 lg:w-1/3 mx-10 border shadow mt-32">
                <form className="space-y-4" action="#">
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
                        onClick={handleSubmit}
                        type="submit"
                        className="mt-5 w-full py-2 px-5 font-semibold rounded border border-[#007562] hover:text-[#007562] text-white bg-[#007562] hover:bg-white cursor-pointer "
                    >
                        Change
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
