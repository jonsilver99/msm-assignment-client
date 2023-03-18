import './Message-List.scss'

function MessageList({ messageList, onScrolledAllMessages = () => { } }) {

    const onScrollHandler = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.target
        if (scrollHeight - scrollTop - clientHeight < 1) onScrolledAllMessages()
    }

    return <ul className="message-list" onScroll={onScrollHandler}>
        {
            (messageList?.length || 0) > 0 && messageList.map((msg, i) => {
                return (
                    <li className={`message-li status-${msg.status}`} key={`message-li-${i}`} data-sid={msg.sid}>
                        <div className="message-li-phone"><b>{msg.phoneNum}</b></div>
                        <div className="message-li-date">{msg.date?.toUTCString()}</div>
                        <div className="message-li-length">{msg.text?.length || 0}/250</div>
                        {msg.text}
                    </li>
                )
            })
        }
        {
            !messageList.length && <li>Nothing yet...</li>
        }
    </ul>

}


export default MessageList