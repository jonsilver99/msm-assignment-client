import logo from './logo.svg';
import './App.scss';
import { useState } from 'react';
import Panel from './components/panel/Panel';
import HTTP from './models/http.js'


function App() {

    const [mode, setMode] = useState('front')

    const switchMode = (mode) => setMode(mode)

    const env = process.env;
    let messagesEndpoint

    if (mode === 'front')
        messagesEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${env.REACT_APP_TWILIO_ACCOUNT}/Messages.json`
    else
        messagesEndpoint = `${env.REACT_APP_BASE_URL}/messages`

    const fetchFunc = mode === 'front' ? null : (skip, take) => {
        return HTTP.request(`${messagesEndpoint}/${skip}/${take}`, { method: 'GET' })
    }

    const submitFunc = (message) => {
        return HTTP.request(messagesEndpoint, {
            method: 'POST',
            headers: { 'Authorization': 'Basic ' + btoa(`${env.REACT_APP_TWILIO_ACCOUNT}:${env.REACT_APP_TWILIO_TOKEN}`) },
            body: (() => {
                if (mode === 'front') return new URLSearchParams({
                    Body: message.text,
                    To: message.phoneNum,
                    From: env.REACT_APP_TWILIO_PHONE_NUM,
                })
                else return new URLSearchParams(message)
            })(),
            cache: 'default',
        })
    }

    return (
        <div className="App">
            <header className="App-header flex-row align-center justify-space-between">
                <div className='flex-row align-center'>
                    <img src={logo} className="App-logo" alt="logo" />
                    MySMS Messenger
                </div>
                <div className='flex-row align-center'>
                    <button onClick={() => switchMode('front')} className={mode === 'front' ? 'selected' : ''}>Front</button>
                    <button onClick={() => switchMode('e2e')} className={mode === 'e2e' ? 'selected' : ''}>E2E</button>
                </div>
            </header>
            <div className="App-body">
                <Panel fetchFunc={fetchFunc} submitFunc={submitFunc} />
            </div>
        </div>
    );
}

export default App;
