import './Message-List.scss'

function MessageList({ messageList, onScrolledAllMessages = () => { } }) {

    const onScrollHandler = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.target
        if (scrollHeight - scrollTop - clientHeight < 1) onScrolledAllMessages()
    }

    // transform messagelist values and sort by desc dates
    const listItems = messageList.map(m => ({ ...m, date: new Date(m.date) })).sortByDate('desc')

    return <ul className="message-list" onScroll={onScrollHandler}>
        {
            (listItems?.length || 0) > 0 && listItems.map((msg, i) => {
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
            !listItems.length && <li>Nothing yet...</li>
        }
    </ul>

}


export default MessageList