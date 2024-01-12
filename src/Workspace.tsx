import React, { DragEvent, MouseEvent, useState } from "react";
import { add, move, moveEnd, select } from "./redux/canvasSlice";
import { selectCanvasElements, selectDragElement } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Shapes } from "./Shapes";
import { Point } from "./models";

export default function Workspace() {
    const dispatch = useAppDispatch();
    const canvasElements = useAppSelector(selectCanvasElements);
    const dragElement = useAppSelector(selectDragElement);

    const [selectedElementKey, setSelectedElementKey] = useState<string>();

    const handleMouseMove = React.useCallback(
        (e: MouseEvent) => {
            if (!selectedElementKey) {
                return;
            }
            dispatch(
                move({
                    key: selectedElementKey,
                    point: eventToPoint(e),
                })
            );
        },
        [selectedElementKey, dispatch, move, eventToPoint]
    );

    const resetSelectedElement = React.useCallback(() => {
        if (!selectedElementKey) {
            return;
        }
        dispatch(moveEnd(selectedElementKey));
        setSelectedElementKey(undefined);
    }, [selectedElementKey, dispatch, moveEnd, setSelectedElementKey]);

    const handleOnDrop = React.useCallback(
        (e: DragEvent) => {
            if (!dragElement) {
                return;
            }
            dispatch(
                add({
                    shape: dragElement,
                    point: eventToPoint(e),
                })
            );
        },
        [dragElement, dispatch, add, eventToPoint]
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
                onMouseUp={resetSelectedElement}
                onMouseLeave={resetSelectedElement}
                className="canvas"
                viewBox="0 0 1200 600"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                {Object.values(canvasElements).map((element) => {
                    const Shape = Shapes[element.shape];
                    const handleMouseDown = (e: MouseEvent) => {
                        e.stopPropagation();
                        setSelectedElementKey(element.key);
                        dispatch(select(element.key));
                    };
                    return (
                        <Shape
                            active={element.active}
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
