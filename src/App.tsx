import React, { useEffect } from "react";
import Palette from "./Palette";
import { useAppDispatch } from "./redux/hooks";
import { resetSelected, deleteSelected, undo, redo } from "./redux/canvasSlice";
import Workspace from "./Workspace";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

export default function App() {
    const dispatch = useAppDispatch();

    const handleKeyUp = React.useCallback(
        (event: KeyboardEvent) => {
            const action = keyMap[event.key];
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

const keyMap = {
    d: deleteSelected,
    Escape: resetSelected,
    u: undo,
    r: redo,
} as Record<string, ActionCreatorWithoutPayload>;
