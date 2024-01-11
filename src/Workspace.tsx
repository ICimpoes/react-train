import React, { DragEvent, MouseEvent } from "react";
import { drop, move, select, resetSelected } from "./redux/reducers";
import { selectCanvasElements } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Shapes } from "./Shapes";
import { Point } from "./models";

export default function Workspace() {
    const dispatch = useAppDispatch();
    const canvasElements = useAppSelector(selectCanvasElements);

    const handleMouseMove = React.useCallback(
        (e: MouseEvent) => {
            dispatch(move(eventToPoint(e)));
        },
        [dispatch, move, eventToPoint]
    );

    const resetDragElement = React.useCallback(() => {
        dispatch(resetSelected());
    }, [dispatch, resetSelected]);

    const handleOnDrop = React.useCallback(
        (e: DragEvent) => {
            dispatch(drop(eventToPoint(e)));
        },
        [dispatch, drop, eventToPoint]
    );

    const handleDragOver = React.useCallback((e: DragEvent) => {
        e.preventDefault();
    }, []);

    return (
        <div data-testid="workspace" className="workspace">
            <svg
                id="canvas"
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                onMouseMove={handleMouseMove}
                onMouseUp={resetDragElement}
                onMouseLeave={resetDragElement}
                className="canvas"
                viewBox="0 0 1200 600"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                {Object.values(canvasElements).map((element) => {
                    const Shape = Shapes[element.shape];
                    const handleMouseDown = () => {
                        dispatch(select(element.key));
                    };
                    return (
                        <Shape
                            key={element.key}
                            point={element.point}
                            onMouseDown={handleMouseDown}
                        />
                    );
                })}
            </svg>
        </div>
    );
}

function eventToPoint(e: MouseEvent): Point {
    return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
}
