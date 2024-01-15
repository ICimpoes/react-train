import React, { DragEvent, MouseEvent, useState } from "react";
import { add, move, moveEnd, select } from "./redux/canvasSlice";
import { selectCanvasItems, selectDragItem } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Shapes } from "./Shapes";
import { Point } from "./models";

export default function Workspace() {
    const dispatch = useAppDispatch();
    const canvasItems = useAppSelector(selectCanvasItems);
    const dragItem = useAppSelector(selectDragItem);

    const [selectedItemKey, setSelectedItemKey] = useState<string>();

    const handleMouseMove = React.useCallback(
        (e: MouseEvent) => {
            if (!selectedItemKey) {
                return;
            }
            dispatch(
                move({
                    key: selectedItemKey,
                    point: eventToPoint(e),
                })
            );
        },
        [selectedItemKey, dispatch, move, eventToPoint]
    );

    const resetSelectedItem = React.useCallback(() => {
        if (!selectedItemKey) {
            return;
        }
        dispatch(moveEnd(selectedItemKey));
        setSelectedItemKey(undefined);
    }, [selectedItemKey, dispatch, moveEnd, setSelectedItemKey]);

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

    return (
        <div data-testid="workspace" className="workspace">
            <svg
                id="canvas"
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                onMouseMove={handleMouseMove}
                onMouseUp={resetSelectedItem}
                onMouseLeave={resetSelectedItem}
                className="canvas"
                viewBox="0 0 1200 600"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                {Object.values(canvasItems).map((item) => {
                    const Shape = Shapes[item.shape];
                    const handleMouseDown = (e: MouseEvent) => {
                        e.stopPropagation();
                        setSelectedItemKey(item.key);
                        dispatch(select(item.key));
                    };
                    return (
                        <Shape
                            active={item.active}
                            key={item.key}
                            point={item.point}
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
