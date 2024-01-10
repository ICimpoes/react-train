import React, { DragEvent, MouseEvent } from "react";
import { drop, move, select, resetSelected } from "./redux/reducers";
import { selectCanvasElements } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Shapes } from "./Shapes";

export default function Workspace() {
    const dispatch = useAppDispatch();
    const canvasElements = useAppSelector(selectCanvasElements);

    const handleMouseMove = React.useCallback(
        (e: MouseEvent) => {
            dispatch(
                move({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
            );
        },
        [canvasElements]
    );

    const resetDragElement = React.useCallback(() => {
        dispatch(resetSelected());
    }, []);

    const handleOnDrop = React.useCallback((e: DragEvent) => {
        dispatch(drop({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }));
    }, []);

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
                {canvasElements.map((element, idx) => {
                    return Shapes[element.shape]({
                        point: element.point,
                        active: element.active,
                        onMouseDown: () => {
                            dispatch(select(idx));
                        },
                    });
                })}
            </svg>
        </div>
    );
}
