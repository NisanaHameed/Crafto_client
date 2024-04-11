import { useEffect, useRef, useState } from "react"
import Conversation from "../../Components/common/Chat/Conversation"
import Navbar from "../../Components/common/Navbar"
import { useSelector } from "react-redux";
import Message from "../../Components/common/Chat/Message";
import { io, Socket } from 'socket.io-client'
import { getMessages, sendNewMessage } from '../../Api/professional'
import { getConversations } from "../../Api/user";
import { jwtDecode } from "jwt-decode";

interface IState {
    auth: {
        userData: string
    }
}
interface Message {
    senderId: string,
    text: string,
    conversationId: string
    createdAt: Date
}
const Chat = () => {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    const [user, setUSer] = useState('')
    const [userId, setUserId] = useState('');
    const socket = useRef<Socket | undefined>();
    const { userData } = useSelector((state: IState) => state.auth);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        socket.current = io("ws://localhost:3000");
        console.log('indfrooooo')
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
            } as Message)
        })
        console.log(arrivalMessage)
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages(prev => [...prev, arrivalMessage] as Message[])
        console.log(arrivalMessage)
    }, [arrivalMessage])

    useEffect(() => {
        const { Id } = jwtDecode(JSON.parse(localStorage.getItem('userData') as string))
        console.log('userid token', Id)
        setUserId(Id);
        socket.current?.emit('addUser', Id);

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
    }, [])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res: any = await getMessages(currentChat?._id);
                setMessages(res?.data?.messages);
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
            (member) => member !== user._id
        );

        const res = await sendNewMessage(newMessage, currentChat?._id, userId);
        socket.current?.emit('sendMessage', {
            senderId: userId,
            receiverId,
            text: newMessage
        })
        setNewMessage('')
    }

    return (
        <>
            < Navbar role={'user'} />
            <div className="messenger h-screen flex w-full">
                <div className="chatMenu flex lg:w-1/4 md:w-2/6 w-1/6">
                    <div className="chatMenuWrapper p-0 md:p-2 h-full w-full bg-[#17654c]">
                        {/* <input placeholder="Search for friends" className="w-full px-2 border-b-gray-200 h-8  mt-4 rounded-full hidden md:block" /> */}
                        {conversations && conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                < Conversation conversation={c} currentUser={userId} role={'user'} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox flex lg:w-3/4 md:w-4/6 w-full">
                    <div className="chatBoxWrapper flex flex-col w-full justify-between relative">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop h-full overflow-y-scroll pr-3">
                                    {messages && messages.map((m, index) => (
                                        <div key={index} ref={scrollRef}>
                                            <Message message={m} own={m.senderId === userId} previousMessageDate={index == 0 ? null : new Date(messages[index - 1]?.createdAt)} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom mt-1 flex items-center justify-between">
                                    <textarea
                                        className="chatMessageInput w-5/6 h-14 p-2 rounded"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButton w-1/6 h-14 rounded cursor-pointer bg-[#007562] text-white" onClick={handleSubmit}>
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
            </div>
        </>
    )
}

export default Chat
