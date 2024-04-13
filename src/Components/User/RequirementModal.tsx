import { useNavigate } from "react-router-dom"

interface IRequirement {
    requirement: {
        userId?: string,
        area: string,
        budget: string,
        workPeriod: string,
        service: string,
        rooms?: string,
        type?: string,
        scope?: string,
        plan?: string,
        status?: string
    }
}
const RequirementModal: React.FC<IRequirement> = ({ requirement }) => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/profile')
    }

    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className=" bg-gray-950 bg-opacity-60 my-auto fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 max-h-full"
        >
            <div className="max-w-xs p-6 my-4 bg-[#007562] rounded shadow">
                <h5 className="mb-2 text-xl text-white font-semibold">
                    {requirement.service}
                </h5>
                <p className="mb-3 font-normal text-gray-300">
                    {requirement.service == 'Home construction' && `${requirement.type}- ${requirement.service} in ${requirement.rooms} required.`}
                    {requirement.service == 'Interior design' && `${requirement.scope}- ${requirement.service} required.`}
                    {requirement.service == 'House plan' && `${requirement.plan}- ${requirement.service} required.`}
                </p>
                <div className="flex flex-col space-y-1 w-72">
                    <p className="text-gray-400">{requirement.area}</p>
                    <p className="text-gray-400">{requirement.workPeriod}</p>
                    <p className="text-gray-400">Budget: {requirement.budget == 'Yes' ? 'Fixed budget' : requirement.budget}</p>
                    <p className="text-gray-400">Location:Calicut,Kerala</p>
                </div>
                <a
                    onClick={handleSubmit}
                    className={`inline-flex items-center px-3 py-2 mt-5 text-sm font-medium text-center text-gray-200 bg-[#044733] rounded hover:bg-[#757575] cursor-pointer`}
                >
                    Go Home
                    {/* {requirement.status == 'active' && <svg
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
                            } */}
                </a>
            </div >
        </div>
    )
}

export default RequirementModal
