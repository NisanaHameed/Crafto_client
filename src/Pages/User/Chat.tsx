import { useEffect, useRef, useState } from "react"
import Conversation from "../../Components/common/Chat/Conversation"
import Navbar from "../../Components/common/Navbar"
import Message from "../../Components/common/Chat/Message";
import { io, Socket } from 'socket.io-client'
import { getMessages, sendNewMessage } from '../../Api/professional'
import { getConversations } from "../../Api/user";
import { jwtDecode } from "jwt-decode";

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
    const [userId, setUserId] = useState('');
    const socket = useRef<Socket | undefined>();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        socket.current = io("https://www.crafto.live");

        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: data.createdAt
            } as Message)
        });
        console.log(arrivalMessage)
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) && setMessages(prev => [...prev, arrivalMessage] as Message[])
        console.log(arrivalMessage)
    }, [arrivalMessage])

    useEffect(() => {
        const decoded: any = jwtDecode(JSON.parse(localStorage.getItem('userData') as string))
        console.log('userid token', decoded.Id)
        setUserId(decoded.Id);
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
        if(!newMessage.trim().length){
            return;
        }

        const receiverId = currentChat?.members.find(
            (member) => member !== userId
        );

        const res = await sendNewMessage(newMessage, currentChat?._id as string, userId);
        socket.current?.emit('sendMessage', {
            senderId: userId,
            receiverId,
            text: newMessage,
            createdAt: Date.now()
        })
        setMessages((prev) => [...prev, res?.data.message])
        setNewMessage('')
    }

    return (
        <>
            < Navbar role={'user'} />
            <div className="h-screen flex w-full">
                <div className="flex lg:w-1/4 md:w-2/6 w-1/6">
                    <div className="p-0 md:p-2 h-full w-full bg-[#fbfafa]  border-r">
                        {conversations && conversations.map((c: IConversation) => (
                            <div key={c._id} onClick={() => setCurrentChat(c)}>
                                < Conversation conversation={c} currentUser={userId} role={'user'} />
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
                                            <Message message={m} own={m.senderId === userId} previousMessageDate={index == 0 ? null : new Date(messages[index - 1]?.createdAt)} />
                                        </div>
                                    ))}
                                </div>
                                <div className="sticky bottom-0 mt-1 flex items-center justify-between">
                                    <textarea
                                        className="w-5/6 h-14 p-2 rounded"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="w-1/6 h-14 rounded cursor-pointer bg-[#007562] text-white" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="p-3 mx-auto">
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
