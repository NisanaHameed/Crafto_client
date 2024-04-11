interface IProps {
    message: Object,
    own: boolean,
    previousMessageDate:Date | null
}

const Message: React.FC<IProps> = ({ message, own, previousMessageDate }) => {
    const messageDate = new Date(message?.createdAt);
    const isNewDay = !previousMessageDate || messageDate.getDate() !== previousMessageDate.getDate();
    return (
        <>
        {isNewDay && ( 
                <div className="sectionHeader text-center text-gray-600 text-sm my-2">
                    {messageDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
            )}
        <div className={`${own && 'items-end'} flex flex-col mt-5`}>
            
            <div className="messageTop flex">
                {/* <img src="/hicon3.png" className="messageImg w-8 h-8 rounded-full object-cover mr-2" alt="" /> */}
                <p className={`${own ? 'bg-gray-200 text-black' : 'bg-[#38649e] text-white  ml-3'} messageText p-2 px-3 rounded-2xl max-w-96`}>{message?.text}</p>
            </div>
            <div className="messageBottom text-xs mt-1 ml-4 mr-2">{new Date(message?.createdAt).toLocaleString('en-US',{ hour: 'numeric', minute: '2-digit', hour12: true })}</div>
        </div>
        </>
    )
}

export default Message
