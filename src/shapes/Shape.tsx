import React, { MouseEvent, ReactElement, ReactNode } from "react";
import { createPortal } from "react-dom";
import Draggable from "../editor/Draggable";

export type ShapeClick = (
    element: ReactNode,
    event: MouseEvent<HTMLDivElement>
) => void;

interface ShapeProps {
    onClick: ShapeClick;
    children: ReactNode;
}

export default class Shape extends React.Component<ShapeProps> {
    constructor(props: ShapeProps) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    handleMouseDown(e: MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        this.props.onClick(this.props.children, e);
    }

    public render(): JSX.Element {
        return (
            <div
                onMouseDown={this.handleMouseDown}
                data-testid="shape"
                className="shape"
            >
                {this.props.children}
            </div>
        );
    }
}

class DraggableShape extends React.Component<ShapeProps> {
    constructor(props: ShapeProps) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        console.log("mouse mouse move", e);
    }

    public render(): JSX.Element {
        return (
            <div
                data-testid="shape"
                onMouseMove={this.handleMouseMove}
                className="shape"
            >
                <svg
                    width="50"
                    height="50"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {this.props.children}
                </svg>
            </div>
        );
    }
}

// export default function Shape(svgShape: JSX.Element): JSX.Element {
//     const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
//         console.log("mouse down", e);
//     };
//
//     const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
//         console.log("mouse up", e);
//     };
//
//     const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
//         console.log("mouse move", e);
//     };
//
//     return (
//         <div
//             data-testid="shape"
//             onMouseDown={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             onMouseMove={handleMouseMove}
//             className="shape"
//         >
//             <svg
//                 width="50"
//                 height="50"
//                 version="1.1"
//                 xmlns="http://www.w3.org/2000/svg"
//             >
//                 {svgShape}
//             </svg>
//         </div>
//     );
// }
