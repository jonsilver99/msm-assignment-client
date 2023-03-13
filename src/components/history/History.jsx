import MessageList from '../message-list/Message-List';
import './History.scss'

function History({ messageList, onScrolledAllMessages }) {
    return (
        <div className="History">
            <h2>Message History ({messageList?.length})</h2>
            <MessageList messageList={messageList} onScrolledAllMessages={onScrolledAllMessages} />
        </div>
    )
}

export default History;