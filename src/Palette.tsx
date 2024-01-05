import React from "react";
import Shape, { ShapeType, Shapes } from "./Shapes";

export default function Palette(props: {
    setShape: (shape: ShapeType) => void;
}) {
    return (
        <div data-testid="palette" className="palette">
            {Shapes.map((s, i) => (
                <Shape key={i} shape={s} setShape={props.setShape} />
            ))}
        </div>
    );
}
