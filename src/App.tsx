import React, { useEffect, useState } from "react";
import Palette from "./Palette";
import { useAppDispatch } from "./redux/hooks";
import { resetSelected, deleteSelected, undo, redo } from "./redux/canvasSlice";
import Workspace from "./Workspace";
import HistoryTree from "./HistoryTree";

export default function App() {
    const dispatch = useAppDispatch();
    const [hideHistory, setHideHistory] = useState(true);

    const keyMap = {
        d: () => {
            dispatch(deleteSelected());
        },
        u: () => {
            dispatch(undo());
        },
        r: () => {
            dispatch(redo());
        },
        h: () => {
            setHideHistory((current) => !current);
        },
    } as Record<string, () => void>;

    const handleKeyUp = React.useCallback(
        (event: KeyboardEvent) => {
            const action = keyMap[event.key];
            if (action === undefined) {
                return;
            }
            action();
        },
        [keyMap]
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
