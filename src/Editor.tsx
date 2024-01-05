import React, { useState } from "react";
import { ShapeType } from "./Shapes";
import Palette from "./Palette";
import Workspace from "./Workspace";

export default function Editor() {
    // symply having useState<ShapeType | undefined> does not work.
    // when setting state with shape, the ShapeType function is called? Why?
    const [shape, setShape] = useState<[ShapeType | undefined]>([undefined]);

    return (
        <div data-testid="editor" className="editor">
            <Palette
                setShape={(s: ShapeType) => {
                    setShape([s]);
                }}
            />
            <Workspace shape={shape[0]} />
        </div>
    );
}
