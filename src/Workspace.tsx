import React, { useState, DragEvent, MouseEvent } from "react";
import { Draggable, ShapeType } from "./Shapes";

export default function Workspace(props: {
    draggedShape: ShapeType | undefined;
}) {
    const [canvasElements, setCanvasElements] = useState<React.JSX.Element[]>(
        []
    );
    // symply having useState<Draggable | undefined> does not work.
    // when setting state with draggable, the draggable is called right away?
    const [dragElement, setDragElement] = useState<[Draggable | undefined]>([
        undefined,
    ]);

    const calculateCoordinatesInCanvas = (coordinates: {
        clientX: number;
        clientY: number;
    }) => {
        const canvas = document.getElementById("canvas");
        if (!canvas) {
            return [coordinates.clientX, coordinates.clientY];
        }
        const { x, y } = canvas.getBoundingClientRect();
        return [coordinates.clientX - x, coordinates.clientY - y];
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (dragElement[0]) {
            const [x, y] = calculateCoordinatesInCanvas(e);
            dragElement[0](x, y);
        }
    };

    const resetDragElement = () => {
        setDragElement([undefined]);
    };

    const handleOnDrop = (e: DragEvent) => {
        if (props.draggedShape) {
            const [x, y] = calculateCoordinatesInCanvas(e);
            const element = props.draggedShape(x, y, (e: Draggable) => {
                setDragElement([e]);
            });
            setCanvasElements([...canvasElements, element]);
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
                {canvasElements}
            </svg>
        </div>
    );
}
