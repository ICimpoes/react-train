import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './Clock'
import Clock from './Clock';
import Input from './Input';

function App(prop: { name: string }) {
    const [name, setName] = useState(prop.name);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Hello, {greeting(name)}</p>
                <Input onChange={setName} />
                <Clock name={greeting(name)} />
            </header>
        </div>
    );
}

function greeting(name: string) {
    return name !== "" ? name: "stranger";
}

export default App;
