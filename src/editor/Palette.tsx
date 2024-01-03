import React from "react";
import Circle from "../shapes/Circle";
import Square from "../shapes/Square";
import Triangle from "../shapes/Triangle";

export default function Palette(): JSX.Element {
    return (
        <div data-testid="palette" className="palette">
            <Circle />
            <Square />
            <Triangle />
        </div>
    );
}
