import React, { DragEvent, MouseEvent, useState } from "react";
import { add, move, moveEnd, select } from "./redux/canvasSlice";
import { selectCanvasItems, selectDragItem } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Point } from "./models";
import CanvasShape from "./CanvasShape";

export default function Workspace() {
    const dispatch = useAppDispatch();
    const canvasItems = useAppSelector(selectCanvasItems);
    const dragItem = useAppSelector(selectDragItem);

    const [movingItemId, setMovingItemId] = useState<string>();

    const handleMouseMove = React.useCallback(
        (e: MouseEvent) => {
            if (!movingItemId) {
                return;
            }
            dispatch(
                move({
                    id: movingItemId,
                    point: eventToPoint(e),
                })
            );
        },
        [movingItemId, dispatch, move, eventToPoint]
    );

    const handleShapeMoveEnd = React.useCallback(() => {
        if (!movingItemId) {
            return;
        }
        dispatch(moveEnd(movingItemId));
        setMovingItemId(undefined);
    }, [movingItemId, dispatch, moveEnd, setMovingItemId]);

    const handleOnDrop = React.useCallback(
        (e: DragEvent) => {
            if (!dragItem) {
                return;
            }
            dispatch(
                add({
                    shape: dragItem,
                    point: eventToPoint(e),
                })
            );
        },
        [dragItem, dispatch, add, eventToPoint]
    );

    const handleDragOver = React.useCallback((e: DragEvent) => {
        e.preventDefault();
    }, []);

    const handleShapeMouseDown = React.useCallback(
        (id: string) => {
            setMovingItemId(id);
            dispatch(select(id));
        },
        [setMovingItemId, dispatch, select]
    );

    return (
        <div data-testid="workspace" className="workspace">
            <svg
                id="canvas"
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                onMouseMove={handleMouseMove}
                onMouseUp={handleShapeMoveEnd}
                onMouseLeave={handleShapeMoveEnd}
                className="canvas"
                viewBox="0 0 1200 600"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                {Object.values(canvasItems).map((item) => {
                    return (
                        <CanvasShape
                            key={item.id}
                            item={item}
                            onMouseDown={handleShapeMouseDown}
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
