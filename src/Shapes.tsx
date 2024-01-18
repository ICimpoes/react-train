import React, { MouseEvent } from "react";
import { Point } from "./models";

export const Shapes = {
    circle: Circle,
    square: Square,
    triangle: Triangle,
};

export type ShapeType = keyof typeof Shapes;

export const ShapeTypes: ShapeType[] = Object.keys(Shapes) as ShapeType[];

interface ShapeProps {
    point: Point;
    className: string;
    onMouseDown?: (e: MouseEvent) => void;
}

function Circle(props: ShapeProps): React.JSX.Element {
    return (
        <circle
            className={props.className}
            onMouseDown={props.onMouseDown}
            cx={props.point.x}
            cy={props.point.y}
            r="20"
        />
    );
}

function Square(props: ShapeProps): React.JSX.Element {
    return (
        <rect
            className={props.className}
            onMouseDown={props.onMouseDown}
            x={props.point.x - 20}
            y={props.point.y - 20}
            width="40"
            height="40"
        />
    );
}

function Triangle(props: ShapeProps): React.JSX.Element {
    const calculatePoints = React.useCallback((point: Point): string => {
        const { x, y } = point;
        return `${x - 20},${y + 20} ${x},${y - 20} ${x + 20},${y + 20}`;
    }, []);

    return (
        <polygon
            className={props.className}
            onMouseDown={props.onMouseDown}
            points={calculatePoints(props.point)}
        />
    );
}
