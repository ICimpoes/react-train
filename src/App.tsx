import React, { useEffect, useState } from "react";
import Palette from "./Palette";
import { useAppDispatch } from "./redux/hooks";
import { resetSelected, deleteSelected, undo, redo } from "./redux/canvasSlice";
import Workspace from "./Workspace";
import HistoryTree from "./HistoryTree";

export default function App() {
    const dispatch = useAppDispatch();
    const [hideHistory, setHideHistory] = useState(true);

    const deleteItem = React.useCallback(() => {
        dispatch(deleteSelected());
    }, [dispatch, deleteSelected]);

    const undoChange = React.useCallback(() => {
        dispatch(undo());
    }, [dispatch, undo]);

    const redoChange = React.useCallback(() => {
        dispatch(redo());
    }, [dispatch, redo]);

    const toggleHistory = React.useCallback(() => {
        setHideHistory((current) => !current);
    }, [setHideHistory]);

    const handleKeyUp = React.useCallback(
        (event: KeyboardEvent) => {
            const keyMap: Record<string, () => void> = {
                d: deleteItem,
                u: undoChange,
                r: redoChange,
                h: toggleHistory,
            };
            keyMap[event.key]?.();
        },
        [deleteItem, undoChange, redoChange, toggleHistory]
    );

    const handleMouseDown = React.useCallback(() => {
        dispatch(resetSelected());
    }, [dispatch, resetSelected]);

    useEffect(() => {
        document.addEventListener("keyup", handleKeyUp);
        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    return (
        <div data-testid="editor" className="editor">
            <Palette />
            <Workspace />
            <HistoryTree hidden={hideHistory} />
        </div>
    );
}
