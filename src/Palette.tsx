import React from "react";
import { Shapes, ShapeTypes, ShapeType } from "./Shapes";

interface PaletteProps {
    onDragStart: (shape: ShapeType) => void;
}

export default function Palette(props: PaletteProps) {
    return (
        <div data-testid="palette" className="palette">
            {ShapeTypes.map((key) => {
                return (
                    <Shape
                        onDragStart={props.onDragStart}
                        key={key}
                        shape={key}
                    />
                );
            })}
        </div>
    );
}

interface ShapeProps {
    shape: ShapeType;
    onDragStart: (shape: ShapeType) => void;
}

function Shape(props: ShapeProps) {
    const handleDragStart = React.useCallback(() => {
        props.onDragStart(props.shape);
    }, [props.shape]);

    return (
        <div data-testid="shape" className="shape">
            <div onDragStart={handleDragStart} draggable={true}>
                <svg
                    width="50"
                    height="50"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {Shapes[props.shape]({ point: { x: 25, y: 25 } })}
                </svg>
            </div>
        </div>
    );
}
