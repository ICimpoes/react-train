import React, { ReactNode, useState } from "react";

export default function Workspace(props: {
    elements: ReactNode;
    setMouseEnter: (b: boolean) => void;
}) {
    return (
        <div data-testid="workspace" className="workspace">
            <svg
                onMouseEnter={() => {
                    console.log("enter");
                    props.setMouseEnter(true);
                }}
                onMouseLeave={() => {
                    console.log("leave");
                    props.setMouseEnter(false);
                }}
                className="canvas"
                viewBox="0 0 1200 600"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                {props.elements}
            </svg>
        </div>
    );
}
