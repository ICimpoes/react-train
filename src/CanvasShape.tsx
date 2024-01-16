import React, { MouseEvent } from "react";
import { CanvasItem, classNames } from "./models";
import { Shapes } from "./Shapes";

interface CanvasShapeProps {
    item: CanvasItem;
    onMouseDown: (id: string) => void;
}

export default function CanvasShape(
    props: CanvasShapeProps
): React.JSX.Element {
    const Shape = Shapes[props.item.shape];
    const handleMouseDown = React.useCallback(
        (e: MouseEvent) => {
            e.stopPropagation();
            props.onMouseDown(props.item.id);
        },
        [props.item.id, props.onMouseDown]
    );

    return (
        <Shape
            className={classNames("svg-shape", !!props.item.active && "active")}
            point={props.item.point}
            onMouseDown={handleMouseDown}
        />
    );
}
