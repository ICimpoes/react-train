import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Point } from "./models";

export const Shapes = {
    circle: (props: shapeProps) => {
        return <Circle key={uuidv4()} props={props} />;
    },
    square: (props: shapeProps) => {
        return <Square key={uuidv4()} props={props} />;
    },
    triangle: (props: shapeProps) => {
        return <Triangle key={uuidv4()} props={props} />;
    },
};

export type ShapeType = keyof typeof Shapes;

export const ShapeTypes: ShapeType[] = Object.keys(Shapes) as ShapeType[];

interface shapeProps {
    point: Point;
    active?: boolean;
    onMouseDown?: () => void;
}

interface propsWrapper {
    props: shapeProps;
}

function shapeClass(active?: boolean): string {
    if (active) {
        return "svg-shape active";
    }
    return "svg-shape";
}

function Circle(props: propsWrapper): React.JSX.Element {
    return (
        <circle
            className={shapeClass(props.props.active)}
            onMouseDown={props.props.onMouseDown}
            cx={props.props.point.x}
            cy={props.props.point.y}
            r="20"
        />
    );
}

function Square(props: propsWrapper): React.JSX.Element {
    return (
        <rect
            className={shapeClass(props.props.active)}
            onMouseDown={props.props.onMouseDown}
            x={props.props.point.x - 20}
            y={props.props.point.y - 20}
            width="40"
            height="40"
        />
    );
}

function Triangle(props: propsWrapper): React.JSX.Element {
    const calculatePoints = React.useCallback((point: Point): string => {
        const { x, y } = point;
        return `${x - 20},${y + 20} ${x},${y - 20} ${x + 20},${y + 20}`;
    }, []);

    return (
        <polygon
            className={shapeClass(props.props.active)}
            onMouseDown={props.props.onMouseDown}
            points={calculatePoints(props.props.point)}
        />
    );
}
