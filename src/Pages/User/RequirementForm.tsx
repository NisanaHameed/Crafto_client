import { useState } from "react"
import Navbar from "../../Components/common/Navbar"
import RequirementForm1 from "../../Components/User/RequirementForm1";
import RequirementForm2 from "../../Components/User/RequirementForm2";
import RequirementForm3 from "../../Components/User/RequirementForm3";

const RequirementForm = () => {

    const [state, setState] = useState('Form');
    return (
        <>
            < Navbar role={'user'} />
            {state == 'Form' && (<div className="md:w-3/6 w-5/6 mx-auto rounded shadow-lg p-9 mt-12">
                <div className="mb-12 space-y-2">
                    <h2 className="font-semibold text-xl text-[#2c7145]">Post your Requirement</h2>
                    <p className="font-light text-sm">Answer some questions and we will hepl you find the best professionals for your home construction</p>
                </div>
                <div className="space-y-3 w-full flex flex-col justify-center items-center">
                    <h2 className="pb-3">Please specify the nature of service you need.</h2>
                    <button onClick={() => setState('Form1')} className="border border-[#2c7145] w-72 py-3">Home Construction</button>
                    <button onClick={() => setState('Form2')} className="border border-[#2c7145] w-72 py-3">Interior Designs</button>
                    <button onClick={() => setState('Form3')} className="border border-[#2c7145] w-72 py-3">House Plans</button>
                </div>
            </div>)}
            {state == 'Form1' && <RequirementForm1 setState={setState} />}
            {state == 'Form2' && <RequirementForm2 setState={setState} />}
            {state == 'Form3' && <RequirementForm3 setState={setState} />}
        </>
    )
}

export default RequirementForm