import React, { useEffect } from "react";
import Palette from "./Palette";
import { useAppDispatch } from "./redux/hooks";
import { resetSelected, deleteSelected, undo } from "./redux/canvasSlice";
import Workspace from "./Workspace";

export default function App() {
    const dispatch = useAppDispatch();

    const handleKeyUp = React.useCallback(
        (event: KeyboardEvent) => {
            const action = keyMap(event.key);
            if (action) {
                dispatch(action());
            }
        },
        [keyMap, dispatch]
    );

    const handleMouseDown = React.useCallback(() => {
        dispatch(resetSelected());
    }, [dispatch, resetSelected]);

    useEffect(() => {
        document.addEventListener("keyup", handleKeyUp);
        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
            document.removeEventListener("keyup", handleMouseDown);
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
            return deleteSelected;
        case "Escape":
            return resetSelected;
        case "u":
            return undo;
        default:
            return undefined;
    }
}
