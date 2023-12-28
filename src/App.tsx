import { useState } from 'react';
import './App.css';
import './Clock'
import Clock from './Clock';
import Input from './Input';
import Todo from './todo/List'

function App(prop: { name?: string }) {
    const [name, setName] = useState(prop.name);

    return (
        <div className="App">
            <header className="App-header">
                <p>Hello, {greeting(name)}</p>
                <Input onChange={setName} />
                <Clock name={greeting(name)} />
                <Todo />
            </header>
        </div>
    );
}

function greeting(name?: string) {
    return name && name !== "" ? name : "stranger";
}

export default App;
