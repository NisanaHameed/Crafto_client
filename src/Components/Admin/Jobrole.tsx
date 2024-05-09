import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { addJobrole, getJobrole, deleteJobrole, editJobrole } from "../../Api/admin";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";

interface Jobrole {
    _id: string,
    name: string
}

const Jobrole = () => {

    const [name, setName] = useState('');
    const [jobroles, setJobroles] = useState<Jobrole[]>([]);
    const [rerender, setRerender] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingJId, setDeletingJId] = useState('');
    const [editingId, setEditingId] = useState('');
    const [editedName,setEditedName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobroles = async () => {
            try {
                const res = await getJobrole();
                setJobroles(res?.data.jobroles);
            } catch (err) {
                console.log(err);
            }
        }
        fetchJobroles();
    }, [rerender])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!name.trim().length) {
            toast.error('Enter jobrole');
            return;
        }
        console.log(name)
        const res = await addJobrole(name);
        if (res?.data.success) {
            toast.success('Jobrole added!');
            setRerender(!rerender);
            setName('')
            navigate('/admin/jobrole');
        }

    }

    const handleDelete = async (id: string) => {
        setShowConfirmationModal(true);
        setDeletingJId(id);
    }

    const handleConfirmDelete = async () => {
        const res = await deleteJobrole(deletingJId);
        if (res?.data.success) {
            toast.success('Jobrole deleted!')
        }
        setShowConfirmationModal(false);
        setDeletingJId('');
        setRerender(!rerender);
    }

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    }

    const handleEditing = async (e:any,id:string)=>{
        e.preventDefault();

        if(!editedName.trim().length){
            toast.error('Enter jobrole!');
            return ;
        }

        const res = await editJobrole(id,editedName);
        if(res?.data.success){
            toast.success('jobrole edited!');
        }
        setEditingId('');
        setEditedName('');
        setRerender(!rerender);
    }

    return (
        <div className="p-4 sm:ml-64 mt-5">
            <div className="container mx-auto px-4">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div className=" p-4 ">

                        <h2 className="mb-4 text-lg font-semibold text-gray-900 ">Current Job Roles</h2>


                        <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-green-700 uppercase bg-[#f3edd988]">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Jobrole
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {jobroles.map((val, index) => {
                                        return (
                                            <tr className="bg-white border-b" key={index}>
                                                {editingId==val._id ? <input value={editedName} onChange={(e)=>setEditedName(e.target.value)} className="border border-gray-300 w-[200px] p-2 mt-3 ml-3 rounded" placeholder={val.name} /> :
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                        {val.name}
                                                    </th>
                                                }
                                                <td className="px-6 py-4">
                                                    {editingId==val._id ? <button onClick={(e)=>handleEditing(e,val._id)} className="py-1 border border-[#007562] text-[#007562] hover:bg-[#007562] hover:text-white font-semibold px-6 rounded" >Edit</button>:
                                                    <>
                                                     <img src="/edit.png" onClick={()=>setEditingId(val._id)} className="w-5 inline mr-2 cursor-pointer" alt="" />
                                                     <img src="/delete.png" onClick={() => handleDelete(val?._id)} className="w-5 inline cursor-pointer" alt="" />
                                                     </>
                                                    }
                                                   
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <img src="/jobrole.png" className="w-56 mx-auto" alt="" />
                        <h2 className="text-[#0e3d27] font-semibold py-3">Add new job role</h2>
                        <input className="border border-gray-300 w-1/2 p-2 rounded justify-center" value={name} onChange={(e) => setName(e.target.value)} />
                        <button onClick={handleSubmit} className="block py-1 border border-[#007562] text-[#007562] hover:bg-[#007562] hover:text-white font-semibold px-6 mt-5 rounded ">ADD</button>
                    </div>
                </div>

            </div>

            {showConfirmationModal && (
                <ConfirmationModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCloseConfirmationModal}
                    message='Are you sure you want to delete this jobrole?'
                />
            )}

        </div>
    )
}

export default Jobrole
