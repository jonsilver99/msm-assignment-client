import logo from './logo.svg';
import './App.scss';
import { useState } from 'react';
import Panel from './components/panel/Panel';

function App() {
    const [mode, setMode] = useState('front')

    const toggleMode = () => setMode(mode === 'front' ? 'e2e' : 'front')

    return (
        <div className="App">
            <header className="App-header flex-row align-center justify-space-between">
                <div className='flex-row align-center'>
                    <img src={logo} className="App-logo" alt="logo" />
                    MySMS Messenger
                </div>
                <div className='flex-row align-center'>
                    <button onClick={toggleMode} className={mode === 'front' ? 'selected' : ''}>Front</button>
                    <button onClick={toggleMode} className={mode === 'e2e' ? 'selected' : ''}>E2E</button>
                </div>
            </header>
            <div className="App-body">
                <Panel mode={mode} />
            </div>
        </div>
    );
}

export default App;
