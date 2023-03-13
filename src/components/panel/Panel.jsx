import { useEffect, useState } from "react"
import Form from "../form/Form"
import History from "../history/History.jsx"
import HTTP from '../../models/http.js'
import './Panel.scss'


function Panel({ mode }) {
    const [pendingSub, setPendingSub] = useState(false)
    const [messageList, setMessageList] = useState([])
    // const env = config[mode]
    const env = process.env;
    let messagesEndpoint;

    if (mode === 'front')
        messagesEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${env.REACT_APP_TWILIO_ACCOUNT}/Messages.json`
    else
        messagesEndpoint = `${env.REACT_APP_BASE_URL}/messages`


    const fetchMessages = async (skip, take) => {
        try {
            const messages = await (await HTTP.request(`${messagesEndpoint}/${skip}/${take}`, { method: 'GET' })).json()
            setMessageList((prevState) => [...prevState, ...messages])
        }
        catch (err) {
            throw err
        }
    }

    const onScrolledAllMessages = () => fetchMessages(messageList.length, 5)

    const onNewMessageSub = async (message) => {
        try {
            setPendingSub(true)

            const res = mode === 'front' ? await submitToService(message) : await submitToServer(message)

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

    const submitToService = async (message) => {
        return HTTP.request(messagesEndpoint, {
            method: 'POST',
            headers: { 'Authorization': 'Basic ' + btoa(`${env.REACT_APP_TWILIO_ACCOUNT}:${env.REACT_APP_TWILIO_TOKEN}`) },
            body: new URLSearchParams({
                Body: message.text,
                To: message.phoneNum,
                From: env.REACT_APP_TWILIO_PHONE_NUM,
            }),
            cache: 'default',
        })
    }

    const submitToServer = async (message) => {
        return HTTP.request(messagesEndpoint, {
            method: 'POST',
            headers: { 'Authorization': 'Basic ' + btoa(`${env.REACT_APP_TWILIO_ACCOUNT}:${env.REACT_APP_TWILIO_TOKEN}`) },
            body: new URLSearchParams(message),
            cache: 'default',
        })
    }

    useEffect(() => {
        setMessageList([])
        if (mode === 'e2e') fetchMessages(messageList.length, 5)
    }, [mode])

    return <div className="panel flex-row justify-center">
        <Form onNewMessageSub={onNewMessageSub} pendingSub={pendingSub} />
        <History messageList={messageList} onScrolledAllMessages={mode === 'e2e' ? onScrolledAllMessages : undefined} />
    </div>
}

export default Panel