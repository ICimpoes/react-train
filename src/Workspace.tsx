import React, { useState, DragEvent, MouseEvent } from "react";
import { Shapes, ShapeType } from "./Shapes";

interface canvasShape {
    shape: ShapeType;
    point: {
        x: number;
        y: number;
    };
}

export default function Workspace(props: {
    draggedShape: ShapeType | undefined;
}) {
    const [canvasElements, setCanvasElements] = useState<canvasShape[]>([]);

    const [dragElement, setDragElement] = useState<number | undefined>();

    const handleMouseMove = React.useCallback(
        (e: MouseEvent) => {
            if (dragElement !== undefined) {
                const elements = canvasElements.slice();
                elements[dragElement].point = {
                    x: e.nativeEvent.offsetX,
                    y: e.nativeEvent.offsetY,
                };
                setCanvasElements(elements);
            }
        },
        [canvasElements, dragElement]
    );

    const resetDragElement = () => {
        setDragElement(undefined);
    };

    const handleOnDrop = (e: DragEvent) => {
        if (props.draggedShape) {
            const canvasElement = {
                shape: props.draggedShape,
                point: {
                    x: e.nativeEvent.offsetX,
                    y: e.nativeEvent.offsetY,
                },
            };
            setCanvasElements([...canvasElements, canvasElement]);
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

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
                        handleMouseDown: () => {
                            setDragElement(idx);
                        },
                    });
                })}
            </svg>
        </div>
    );
}
