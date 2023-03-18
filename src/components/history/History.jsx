import MessageList from '../message-list/Message-List';
import './History.scss'

function History({ messageList, onScrolledAllMessages }) {

    // transform messagelist values and sort by desc dates
    const listItems = messageList.map(m => ({ ...m, date: new Date(m.date) })).sortByDate('desc')

    return (
        <div className="History">
            <h2>Message History ({listItems?.length})</h2>
            <MessageList messageList={listItems} onScrolledAllMessages={onScrolledAllMessages} />
        </div>
    )
}

export default History;