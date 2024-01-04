import React, { ReactNode } from "react";
import Shape, { ShapeClick } from "./Shape";

export default function Circle(props: { onClick: ShapeClick }): JSX.Element {
    return (
        <Shape onClick={props.onClick}>
            <svg
                id="draggable"
                width="50"
                height="50"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle id="circle" cx="25" cy="25" r="20" />
            </svg>
        </Shape>
    );
}
