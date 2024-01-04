import React, { MouseEvent, ReactNode } from "react";

export interface Position {
    top: string;
    left: string;
}

interface DraggableProps {
    children: ReactNode;
    position: Position;
}

export default class Draggable extends React.Component<
    DraggableProps,
    Position
> {
    public render() {
        return (
            <div
                style={{
                    position: "fixed",
                    top: this.props.position.top,
                    left: this.props.position.left,
                }}
                hidden={false}
            >
                {this.props.children}
            </div>
        );
    }
}
