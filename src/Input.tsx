import React from 'react';

interface InputProps {
    onChange(input: string): void
}

interface InputState {
    input: string
}

class Input extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChange(e.target.value);
    }

    render(): React.ReactNode {
        return (<input onChange={this.onChange}></input>);
    }
}

export default Input;
