import { useEffect, useState } from "react"
import { getRequirements, updateReq } from "../../Api/user"
import toast from "react-hot-toast"
import ConfirmationModal from "../common/ConfirmationModal"

interface IRequirement {
    _id: string,
    area: string,
    budget: string,
    workPeriod: string,
    service: string,
    rooms?: string,
    type?: string,
    scope?: string,
    plan?: string,
    status: string,
    mobile: string
}
const ShowRequirements = () => {

    const [reqs, setReqs] = useState<IRequirement[]>([])
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deactivateId, setDeactivateId] = useState('');

    useEffect(() => {
        const fetchReqs = async () => {
            const res = await getRequirements();
            if (res?.data?.reqs) {
                setReqs(res.data.reqs);
            }
        }
        fetchReqs();
    }, [])

    const handleSubmit = (id: string) => {
        setShowConfirmationModal(true);
        setDeactivateId(id);
    }

    const deactivate = async () => {

        const res = await updateReq(deactivateId, 'deactivated');
        if (res?.data.success) {
            toast.success('Your requirements is deactivated!')
            setShowConfirmationModal(false);
        }
    }
    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    }
    return (
        <>
            {reqs.length ?
                reqs.map((val, index) =>
                    <div key={index} className="flex flex-col max-w-xs p-6 my-4 bg-[#007562] border rounded shadow">
                        <div className="flex flex-col flex-grow">
                            <h5 className="mb-2 text-xl text-white font-semibold">
                                {val.service}
                            </h5>
                            <p className="mb-3 font-normal text-gray-300">
                                {val.service == 'Home construction' && `${val.type}- ${val.service} in ${val.rooms} required.`}
                                {val.service == 'Interior design' && `${val.scope}- ${val.service} required.`}
                                {val.service == 'House plan' && `${val.plan}- ${val.service} required.`}
                            </p>
                            <div className="flex flex-col space-y-1 w-72">
                                <p className="text-gray-400">{val.area}</p>
                                <p className="text-gray-400">{val.workPeriod}</p>
                                <p className="text-gray-400">Budget: {val.budget == 'Yes' ? 'Fixed budget' : val.budget}</p>
                                <p className="text-gray-400">Location:Calicut,Kerala</p>
                                <p className="text-gray-400">Mobile: {val.mobile}</p>
                            </div>
                        </div>
                        <a
                            onClick={() => {
                                if (val.status !== 'active') {
                                    return;
                                }
                                handleSubmit(val._id)
                            }}
                            className={`inline-flex items-baseline w-1/2 px-3 py-2 mt-5 mb-0 text-sm font-medium text-center text-gray-200 ${val.status == 'active' ? 'bg-[#a2a2a2]' : 'bg-[#044733]'} rounded hover:bg-[#757575] cursor-pointer`}
                        >
                            {val.status == 'active' ? 'Deactivate' : 'Deactivated'}
                            {val.status == 'active' &&
                                <svg
                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            }
                        </a>
                    </div >
                )
                :
                <h2 className="mt-5 text-gray-700">You dont have any requirements yet.<br/> Create a new requirement</h2>
            }
            {showConfirmationModal && < ConfirmationModal onConfirm={deactivate} onCancel={handleCloseConfirmationModal} message="Are you sure you want to deactivate?" />}
        </>
    )
}


export default ShowRequirements
