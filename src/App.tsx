import React, { useEffect } from "react";
import Palette from "./Palette";
import { useAppDispatch } from "./redux/hooks";
import { deleteActive, resetActive } from "./redux/reducers";
import Workspace from "./Workspace";

export default function App() {
    const dispantch = useAppDispatch();

    useEffect(() => {
        document.addEventListener("keyup", (event: KeyboardEvent) => {
            const action = keyMap(event.key);
            if (action) {
                dispantch(action);
            }
        });
    });

    return (
        <div data-testid="editor" className="editor">
            <Palette />
            <Workspace />
        </div>
    );
}

function keyMap(key: string) {
    switch (key) {
        case "d":
            return deleteActive();
        case "Escape":
            return resetActive();
        default:
            return undefined;
    }
}
