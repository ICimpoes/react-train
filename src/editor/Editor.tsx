import React from "react";
import Palette from "./Palette";
import Workspace from "./Workspace";

export default function Editor(): JSX.Element {
    return (
        <div data-testid="editor" className="editor">
            <Palette />
            <Workspace />
        </div>
    );
}
