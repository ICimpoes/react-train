import React from "react";

export default function Shape(svgShape: JSX.Element): JSX.Element {
    return (
        <div data-testid="shape" className="shape">
            <svg
                width="50"
                height="50"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                {svgShape}
            </svg>
        </div>
    );
}
