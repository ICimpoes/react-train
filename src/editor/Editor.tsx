import React, { MouseEvent, ReactNode, useState } from "react";
import Circle from "../shapes/Circle";
import Draggable from "./Draggable";
import Palette from "./Palette";
import Workspace from "./Workspace";

export default function Editor(): JSX.Element {
    const [element, setElement] = useState<ReactNode>(null);
    const [canvasElement, setCanvasElement] = useState<ReactNode[]>([]);
    const [position, setPosition] = useState({ top: "0px", left: "0px" });
    const [mouseInCanvas, setMouseInCanvas] = useState(false);

    const handleMouseMove = (e: MouseEvent<Element>) => {
        e.preventDefault();
        if (!element) {
            return;
        }
        setPosition({
            top: `${e.clientY - 25}px`,
            left: `${e.clientX - 25}px`,
        });
    };

    const handleMouseUp = (e: MouseEvent<Element>) => {
        e.preventDefault();
        console.log("editor, up", mouseInCanvas);
        if (mouseInCanvas) {
            console.log("in canvas");
        }
        setElement(null);
        setPosition({ top: "0px", left: "0px" });
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            data-testid="editor"
            className="editor"
        >
            <Draggable position={position}>{element}</Draggable>
            <Palette onClick={setElement} />
            <Workspace
                setMouseEnter={(b: boolean) => {
                    console.log(b);
                    setMouseInCanvas(b);
                }}
                elements={canvasElement}
            />
        </div>
    );
}
