import { useEffect, useState } from "react"
import { cancelSubscription, profProfile, subscribe } from "../../Api/professional"
import Sidebar from "../../Components/Professional/Sidebar"
import Navbar from "../../Components/common/Navbar"
import ConfirmationModal from "../../Components/common/ConfirmationModal"
import { loadStripe } from "@stripe/stripe-js"
import toast from "react-hot-toast"

interface IProf {
    isVerified: boolean
}

const Subscription = () => {

    const [showButtons, setShowButtons] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [profData, setProfData] = useState<IProf>()
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: any = await profProfile();
                setProfData(res?.data.profdata);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [rerender])

    const handleSubscribe = async (plan: string) => {
        const stripe = await loadStripe(import.meta.env.VITE_REACT_APP_stripe_key as string);
        const res = await subscribe(plan);
        console.log(res);
        console.log(res?.data.stripe)
        const sessionId = res?.data.stripe;
        await stripe?.redirectToCheckout({ sessionId });
        setShowButtons(false);
        setRerender(!rerender);
    }

    const handleCancel = async () => {
        const res = await cancelSubscription();
        if (res?.data.success) {
            toast.success('Subscription cancelled successfully!');
            setShowConfirmation(false);
            setRerender(!rerender);
        }
    }

    const onCancel = () => {
        setShowConfirmation(false);
    }
    return (
        <>
            < Navbar role='professional' />
            <div className="flex flex-row">
                <div className="md:w-1/4 w-0 z-10">
                    < Sidebar />
                </div>
                <div className="mt-10 md:w-3/4 w-full px-10 lg:px-0">

                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2">
                            {showButtons == false &&
                                <>
                                    <h2 className="text-lg mb-5 text-green-800 font-semibold md:ml-10 lg:ml-0 mt-5">Subsription</h2>
                                    <p className="text-gray-700">
                                        Subscribe to our premium plan, take an oppurtunity to elevate your career and unlock new possibilities.
                                    </p>
                                    <h2 className="text-lg font-mono text-[#8ea622] mt-3">What you get?</h2>
                                    <p className="text-gray-600 mt-1">Get instant access to requirements posted by users seeking your expertise. Stay ahead of the completion by receiving notifications as soon as a new requirement is posted.</p>
                                    {
                                        profData?.isVerified ?
                                            <button onClick={() => setShowConfirmation(true)} className="bg-[#2e9474] px-4 py-2 text-white font-thin tracking-wide mt-10">Cancel Subscription</button>
                                            : <button onClick={() => setShowButtons(true)} className="bg-[#2e9474] px-4 py-2 text-white font-thin tracking-wide mt-10">Subscribe</button>
                                    }
                                </>
                            }
                            {showButtons &&
                                <>
                                    <div className="max-w-sm p-6 bg-white border rounded shadow">
                                        <h5 className="mb-3 text-xl tracking-tight text-gray-900 ">
                                            Rs 229 <span className="text-sm">/month</span>
                                        </h5>
                                        <a
                                            onClick={() => handleSubscribe('monthly')}
                                            className="inline-flex items-center px-3 py-2 text-sm text-center text-[#2e9474] hover:bg-[#2e9474] hover:text-white border border-[#2e9474] focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                                        >
                                            Choose
                                        </a>
                                    </div>
                                    <div className="max-w-sm p-6 bg-white border rounded shadow mt-4 ">
                                        <h5 className="mb-3 text-xl tracking-tight text-gray-900 ">
                                            Rs 2748 <span className="text-sm">/ year</span>
                                        </h5>
                                        <a
                                            onClick={() => handleSubscribe('yearly')}
                                            className="inline-flex items-center px-3 py-2 text-sm text-center text-[#2e9474] hover:bg-[#2e9474] hover:text-white border border-[#2e9474] focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                                        >
                                            Choose
                                        </a>
                                    </div>
                                    <button onClick={() => setShowButtons(false)} className="bg-[#2e9474] px-4 py-2 text-white font-thin tracking-wide mt-10">Cancel</button>
                                </>
                            }
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img src="/subscribePicture.png" className="w-96" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {showConfirmation && < ConfirmationModal onConfirm={handleCancel} onCancel={onCancel} message={'Are you sure you want to continue? You will lose the subscription benefits!'} />}
        </>
    )
}

export default Subscription
