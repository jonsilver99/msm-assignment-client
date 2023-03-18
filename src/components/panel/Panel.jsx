import { useEffect, useState } from "react"
import Form from "../form/Form"
import History from "../history/History.jsx"
import './Panel.scss'

function Panel({ fetchFunc, submitFunc }) {
    const [pendingSub, setPendingSub] = useState(false)
    const [messageList, setMessageList] = useState([])

    const fetchMessages = async (skip, take) => {
        if (!fetchFunc) return
        try {
            const messages = await (await fetchFunc(skip, take)).json()
            setMessageList(prevState => [...prevState, ...messages])
        }
        catch (err) {
            throw err
        }
    }

    const onScrolledAllMessages = () => fetchMessages(messageList.length, 5)

    const onNewMessageSub = async (message) => {
        try {
            setPendingSub(true)

            const res = await submitFunc(message)

            onMessageSubmissionResult(message, res.ok, await res.json())

            setPendingSub(false)

        } catch (error) {
            setPendingSub(false)
            alert('Failed unexpectedly!')
            throw error
        }
    }

    const onMessageSubmissionResult = (message, success, data) => {
        if (success) {
            message.sid = data.sid
            message.status = data.status
        } else {
            message.status = 'failed'
        }
        setMessageList((prevState) => [...prevState, message])
    }

    useEffect(() => {
        setMessageList([])
        fetchMessages(messageList.length, 5)
    }, [fetchFunc, submitFunc])

    return <div className="panel flex-row justify-center">
        <Form onNewMessageSub={onNewMessageSub} pendingSub={pendingSub} />
        <History messageList={messageList} onScrolledAllMessages={onScrolledAllMessages} />
    </div>
}

export default Panel