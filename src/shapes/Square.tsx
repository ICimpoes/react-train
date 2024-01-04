import React, { ReactNode } from "react";
import Shape, { ShapeClick } from "./Shape";

export default function Square(props: { onClick: ShapeClick }): JSX.Element {
    return (
        <Shape onClick={props.onClick}>
            <svg
                id="draggable"
                width="50"
                height="50"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect id="square" x="5" y="5" width="40" height="40" />
            </svg>
        </Shape>
    );
}
