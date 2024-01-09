import React, { useState } from "react";
import { ShapeType } from "./Shapes";
import Palette from "./Palette";
import Workspace from "./Workspace";

export default function App() {
    const [dragShape, setDragShape] = useState<ShapeType | undefined>();

    return (
        <div data-testid="editor" className="editor">
            <Palette onDragStart={setDragShape} />
            <Workspace draggedShape={dragShape} />
        </div>
    );
}
