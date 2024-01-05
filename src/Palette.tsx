import React from "react";
import Shape, { ShapeType, Shapes } from "./Shapes";

export default function Palette(props: {
    setDragShape: (shape: ShapeType) => void;
}) {
    return (
        <div data-testid="palette" className="palette">
            {Shapes.map((s, i) => (
                <Shape key={i} shape={s} setDragShape={props.setDragShape} />
            ))}
        </div>
    );
}
