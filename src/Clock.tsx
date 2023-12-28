import React from 'react';

class Clock extends React.Component<{ name: string }, { date: Date }> {
    interval: ReturnType<typeof setInterval> = null as any;

    constructor(props: { name: string }) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount(): void {
        this.interval = setInterval(
            () => {
                this.setState({date: new Date()});
            },
            1000);
    }

    componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    render(): React.ReactNode {
        return (<div>
            <h5>Hi, {this.props.name}! It is {this.state.date.toLocaleTimeString()}</h5>
        </div>);
    }
}

export default Clock;
