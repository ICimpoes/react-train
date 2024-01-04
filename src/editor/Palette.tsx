import React, { ReactNode } from "react";
import Circle from "../shapes/Circle";
import { ShapeClick } from "../shapes/Shape";
import Square from "../shapes/Square";
import Triangle from "../shapes/Triangle";

export default function Palette(props: { onClick: ShapeClick }): JSX.Element {
    return (
        <div data-testid="palette" className="palette">
            <Circle onClick={props.onClick} />
            <Square onClick={props.onClick} />
            <Triangle onClick={props.onClick} />
        </div>
    );
}
