import { useEffect, useState } from "react"
import { getUserById,profDetails } from "../../../Api/professional";

interface IProps {
  conversation: Object,
  currentUser: string
  role:'user' | 'professional'
}
interface IUser{
  name?:string,
  image:string
  firstname?:string
  lastname?:string
}
const Conversation = ({ conversation, currentUser ,role}: IProps) => {

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {

    const friendId = conversation?.members?.find((m) => m !== currentUser)

    const getUser = async () => {
      try {
        if(role=='professional'){
        const res = await getUserById(friendId);
        console.log(res)
        setUser(res?.data?.user)
        }else if(role=='user'){
          const res = await profDetails(friendId);
          console.log(res);
          setUser(res?.data?.profdata);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [currentUser, conversation])

  return (
    <div className="conversation p-2 flex items-center cursor-pointer mt-5 hover:bg-gray-300">
      <img src={user?.image ? user.image:'/profileicon.png'} className="w-14 h-14 rounded-full object-cover mr-3" />
      <span className="text-gray-200 text-[17px] -tracking-tighter hidden md:block">{role==='professional'? user?.name:`${user?.firstname} ${user?.lastname}`}</span>
    </div>
  )
}

export default Conversation
