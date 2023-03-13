import './Form.scss'
import { useState } from "react";


function Form({ onNewMessageSub, pendingSub }) {

    const [state, setState] = useState({ phoneNum: '', text: '' })

    const onChangeHandler = e => {
        let { name, value } = e.target
        if (name === 'text' && value?.length > 250) value = value.slice(0, 250)
        setState(prevState => ({ ...prevState, [name]: value }))
    };

    const onClearFormHandler = () => setState({ phoneNum: '', text: '' })

    const onSubmit = (e) => {
        e.preventDefault()
        const message = {
            ...state,
            phoneNum: normalizePhoneNumPrefix(state.phoneNum),
            date: new Date()
        }
        onNewMessageSub(message)
        onClearFormHandler()
    }

    const normalizePhoneNumPrefix = (phoneNum) => {
        if(!phoneNum) return phoneNum
        phoneNum = phoneNum.toString()
        if(phoneNum.charAt(0) === '0') phoneNum = `972${phoneNum.slice(1, phoneNum.length)}`  
        return `+${phoneNum}`
    }

    return (
        <form className={`Form${pendingSub ? ' pending-sub' : ''}`} onSubmit={onSubmit} onChange={onChangeHandler}>
            <h2>New Message</h2>

            <label htmlFor="phoneNum">
                Phone number
            </label>
            <input type="number" name="phoneNum" id="phoneNum" value={state.phoneNum} onChange={() => { }} />

            <label htmlFor="text">
                Message
            </label>

            <textarea name="text" id='text' value={state.text} onChange={() => { }}>
                {state.text}
            </textarea>
            <div className='text-length-indicator'>{(state.text?.length || 0)}/250</div>

            <br /><br />

            <div className='actions flex-row justify-space-between'>
                <button type="button" onClick={onClearFormHandler}>Clear</button>
                <button type="submit" className='flex-row align-center justify-center'>
                    Submit
                    <i></i>
                </button>
            </div>
        </form>
    );
}

export default Form;


