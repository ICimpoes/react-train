import React, { ReactNode } from "react";
import Shape, { ShapeClick } from "./Shape";

export default function Triangle(props: { onClick: ShapeClick }) {
    return (
        <Shape onClick={props.onClick}>
            <svg
                id="draggable"
                width="50"
                height="50"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <polygon id="triangle" points="7,40 24,7 43,40" />
            </svg>
        </Shape>
    );
}
