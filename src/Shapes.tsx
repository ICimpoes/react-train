import React from "react";
import { v4 as uuidv4 } from "uuid";

export const Shapes = {
    circle: (props: shapeProps) => {
        return (
            <Circle
                key={uuidv4()}
                onMouseDown={props.onMouseDown}
                point={props.point}
            />
        );
    },
    square: (props: shapeProps) => {
        return (
            <Square
                key={uuidv4()}
                onMouseDown={props.onMouseDown}
                point={props.point}
            />
        );
    },
    triangle: (props: shapeProps) => {
        return (
            <Triangle
                key={uuidv4()}
                onMouseDown={props.onMouseDown}
                point={props.point}
            />
        );
    },
};

export type ShapeType = keyof typeof Shapes;

export const ShapeTypes: ShapeType[] = Object.keys(Shapes) as ShapeType[];

interface Point {
    x: number;
    y: number;
}

interface shapeProps {
    point: Point;
    onMouseDown?: () => void;
}

function Circle(props: shapeProps): React.JSX.Element {
    return (
        <circle
            className="svg-shape"
            onMouseDown={props.onMouseDown}
            cx={props.point.x}
            cy={props.point.y}
            r="20"
        />
    );
}

function Square(props: shapeProps): React.JSX.Element {
    return (
        <rect
            className="svg-shape"
            onMouseDown={props.onMouseDown}
            x={props.point.x - 20}
            y={props.point.y - 20}
            width="40"
            height="40"
        />
    );
}

function Triangle(props: shapeProps): React.JSX.Element {
    const calculatePoints = React.useCallback((point: Point): string => {
        const { x, y } = point;
        return `${x - 20},${y + 20} ${x},${y - 20} ${x + 20},${y + 20}`;
    }, []);

    return (
        <polygon
            className="svg-shape"
            onMouseDown={props.onMouseDown}
            points={calculatePoints(props.point)}
        />
    );
}
