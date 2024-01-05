import React, { MouseEvent } from "react";

function circle(
    x: number,
    y: number,
    setDragItem?: (e: Draggable) => void
): React.JSX.Element {
    const drag = (element: SVGCircleElement) => {
        return (x: number, y: number) => {
            element.setAttributeNS(null, "cx", x.toString());
            element.setAttributeNS(null, "cy", y.toString());
        };
    };

    const handleMouseDown = (e: MouseEvent<SVGCircleElement>) => {
        if (setDragItem) {
            setDragItem(drag(e.currentTarget));
        }
    };

    return (
        <circle
            className="svg-shape"
            onMouseDown={handleMouseDown}
            key={new Date().getTime()}
            cx={x}
            cy={y}
            r="20"
        />
    );
}

function square(
    x: number,
    y: number,
    setDragItem?: (e: Draggable) => void
): React.JSX.Element {
    const drag = (element: SVGRectElement) => {
        return (x: number, y: number) => {
            element.setAttributeNS(null, "x", (x - 20).toString());
            element.setAttributeNS(null, "y", (y - 20).toString());
        };
    };

    const handleMouseDown = (e: MouseEvent<SVGRectElement>) => {
        if (setDragItem) {
            setDragItem(drag(e.currentTarget));
        }
    };

    return (
        <rect
            className="svg-shape"
            onMouseDown={handleMouseDown}
            key={new Date().getTime()}
            x={x - 20}
            y={y - 20}
            width="40"
            height="40"
        />
    );
}

function triangle(
    x: number,
    y: number,
    setDragItem?: (e: Draggable) => void
): React.JSX.Element {
    const calculatePosition = (x: number, y: number): string => {
        return `${x - 20},${y + 20} ${x},${y - 20} ${x + 20},${y + 20}`;
    };

    const drag = (element: SVGPolygonElement) => {
        return (x: number, y: number) => {
            element.setAttributeNS(null, "points", calculatePosition(x, y));
        };
    };

    const handleMouseDown = (e: MouseEvent<SVGPolygonElement>) => {
        if (setDragItem) {
            setDragItem(drag(e.currentTarget));
        }
    };

    return (
        <polygon
            className="svg-shape"
            onMouseDown={handleMouseDown}
            key={new Date().getTime()}
            points={calculatePosition(x, y)}
        />
    );
}

export default function Shape(props: {
    shape: ShapeType;
    setShape: (s: ShapeType) => void;
}) {
    const handleOnDragStart = () => {
        props.setShape(props.shape);
    };
    return (
        <div data-testid="shape" className="shape">
            <div onDragStart={handleOnDragStart} draggable={true}>
                <svg
                    width="50"
                    height="50"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {props.shape(25, 25)}
                </svg>
            </div>
        </div>
    );
}
export const Shapes = [circle, square, triangle];

export type ShapeType = (typeof Shapes)[0];

export type Draggable = (x: number, y: number) => void;
