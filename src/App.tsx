import React, { useEffect } from "react";
import Palette from "./Palette";
import { useAppDispatch } from "./redux/hooks";
import { deleteActive, resetActive, undo } from "./redux/reducers";
import Workspace from "./Workspace";

export default function App() {
    const dispantch = useAppDispatch();

    const handleKeyUp = React.useCallback((event: KeyboardEvent) => {
        const action = keyMap(event.key);
        if (action) {
            dispantch(action());
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

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
            return deleteActive;
        case "Escape":
            return resetActive;
        case "u":
            return undo;
        default:
            return undefined;
    }
}
