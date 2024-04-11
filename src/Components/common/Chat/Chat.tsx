import { useEffect, useState } from "react"
import socket from "../../../Services/socket";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import MessageContainer from "./MessageContainer";

interface IState {
    auth: {
        userData: string
        profData: string
    }
}
const Chat = () => {

    const [sender, setSender] = useState('');
    const { userData, profData } = useSelector((state: IState) => state.auth);
    const [message, setMessage] = useState('');
    const [msgReceived, setMsgReceived] = useState('');

    useEffect(() => {
        if (userData) {
            let decoded: any = jwtDecode(userData);
            setSender(decoded.Id);
        } else if (profData) {
            let decoded: any = jwtDecode(profData);
            setSender(decoded.Id);
        }
    }, [userData, profData])

    const sendMessage = () => {
        socket.emit('send_message', { content: message, sender });
    }

    useEffect(() => {
        socket.on('received_message', (data) => {
            setMsgReceived(data.message);
        })
    }, [socket])

    return (
        <>
            <div className="h-screen bg-[#0a250f] border fixed top-0 left-0 z-40 lg:w-80 md:w-72">
                <h2 className="md:block text-white text-lg hidden pt-5 pl-6">Messages</h2>
                <ul className="mt-14 md:mt-10 flex-col md:ml-3">
                    <li className="p-2 flex text-gray-200 text-[17px] -tracking-tighter"><img src="/hicon3.png" className="w-14 h-14 rounded-full inline mr-3" alt="" /><span className="hidden md:block">Hashim</span></li>
                    <li className="p-2 flex text-gray-200 text-[17px] -tracking-tighter"><img src="/hicon3.png" className="w-14 h-14 rounded-full inline mr-3" alt="" /><span className="hidden md:block">Safna Jamsheer</span></li>
                    <li className="p-2 flex text-gray-200 text-[17px] -tracking-tighter"><img src="/hicon3.png" className="w-14 h-14 rounded-full inline mr-3" alt="" /><span className="hidden md:block">Tintu Sebastian</span></li>
                    <li className="p-2 flex text-gray-200 text-[17px] -tracking-tighter"><img src="/hicon3.png" className="w-14 h-14 rounded-full inline mr-3" alt="" /><span className="hidden md:block">Zera</span></li>
                </ul>
            </div>
            <div className="h-screen flex md:min-w-[450px] md:ml-80 ml-24">
                {/* <input value={message} onChange={(e) => setMessage(e.target.value)} className="opacity-50 text-sm rounded-lg block w-full p-2.5  bg-gray-200" type="text" pattern="Type message" />
                <button onClick={sendMessage} className="border px-7 py-2 bg-gray-400">Send</button>
                <h1>{msgReceived}</h1> */}
                < MessageContainer />
            </div>
        </>
    )
}

export default Chat
