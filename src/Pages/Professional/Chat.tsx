import { useEffect, useRef, useState } from "react"
import Conversation from "../../Components/common/Chat/Conversation"
import Navbar from "../../Components/common/Navbar"
// import { useSelector } from "react-redux";
import Message from "../../Components/common/Chat/Message";
import { io, Socket } from 'socket.io-client'
import { getMessages, getConversations, sendNewMessage } from '../../Api/professional'
import { jwtDecode } from "jwt-decode";
import Sidebar from "../../Components/Professional/Sidebar";

// interface IState {
//     auth: {
//         profData: string
//     }
// }
interface Message {
    senderId: string,
    text: string,
    conversationId: string
    createdAt: Date
}
interface IConversation {
    _id: string
    members: [string]
}
const Chat = () => {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState<IConversation>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    // const [user, setUSer] = useState('')
    const [profId, setProfId] = useState('');
    const socket = useRef<Socket | undefined>();
    // const { profData } = useSelector((state: IState) => state.auth);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.current = io("ws://localhost:3000");
        socket.current.on('getMessage', (data: Message) => {
            console.log(data)
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt:data.createdAt
            } as Message)
        })
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) && setMessages(prev => [...prev, arrivalMessage] as Message[])
    }, [arrivalMessage])

    useEffect(() => {
        const decoded: any = jwtDecode(JSON.parse(localStorage.getItem('profData') as string))
        console.log('profidfrom token', decoded.Id)
        setProfId(decoded.Id);
        socket.current?.emit('addUser', decoded.Id);

    }, [])


    useEffect(() => {
        const getConversation = async () => {
            try {
                const res: any = await getConversations();
                setConversations(res?.data?.conversations)
            } catch (err) {
                console.log(err);
            }
        }
        getConversation();
    }, [arrivalMessage])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (currentChat) {
                    const res: any = await getMessages(currentChat?._id);
                    setMessages(res?.data?.messages);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchMessages();
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const receiverId = currentChat?.members.find(
            (member) => member !== profId
        );
        console.log('receiverId:', receiverId)

        const res = await sendNewMessage(newMessage, currentChat?._id as string, profId);
        socket.current?.emit('sendMessage', {
            senderId: profId,
            receiverId,
            text: newMessage,
            createdAt:Date.now()
        })
        setMessages((prev)=>[...prev,res?.data.message])
        setNewMessage('')
    }

    return (
        <>
            <div>
                < Navbar role={'professional'} />
                <div className="h-screen flex flex-row">
                    <div className="md:w-64 w-0">
                        < Sidebar />
                    </div>
                    <div className="flex w-full">
                        {/* <div className="h-screen flex w-full"> */}
                        <div className="flex lg:w-1/4 md:w-2/6 w-1/6">
                            <div className="p-0 md:p-2 h-full bg-[#fbfafa] w-full border-r">
                                {/* <input placeholder="Search for friends" className="w-full px-2 border-b-gray-200 h-8  mt-4 rounded-full hidden md:block" /> */}
                                {conversations && conversations.map((c: IConversation) => (
                                    <div key={c._id} onClick={() => setCurrentChat(c)}>
                                        < Conversation conversation={c} currentUser={profId} role='professional' />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex lg:w-3/4 md:w-4/6 w-full">
                            <div className="flex flex-col w-full justify-between relative">
                                {currentChat ? (
                                    <>
                                        <div className="h-full overflow-y-scroll pr-3">
                                            {messages && messages.map((m, index) => (
                                                <div key={index} ref={scrollRef}>
                                                    <Message message={m} own={m.senderId === profId} previousMessageDate={index == 0 ? null : new Date(messages[index - 1]?.createdAt)} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="sticky bottom-0 w-full flex items-center justify-between">
                                            <textarea
                                                className="w-5/6 h-12 p-2 rounded border-none bg-[#E9E9E9]"
                                                placeholder="write something..."
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                value={newMessage}
                                            ></textarea>
                                            <button className="w-1/6 h-12 rounded cursor-pointer bg-[#007562] text-white" onClick={handleSubmit}>
                                                Send
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <span className="noConversationText">
                                        Open a conversation to start a chat.
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
