import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "../models";
import { ShapeType } from "../Shapes";
import { v4 as uuid } from "uuid";
import {
    History,
    currentHistory,
    addHitory,
    newHistory,
    redoHistory,
    undoHistory,
} from "./history";

type CanvasStoreState = CanvasItems & { history: History<CanvasItems> };

interface CanvasItems {
    items: Record<string, CanvasItem>;
    activeItemKey?: string;
}

interface CanvasItem {
    key: string;
    shape: ShapeType;
    point: Point;
    active?: boolean;
}

interface ItemPosition {
    key: string;
    point: Point;
}

interface NewItem {
    shape: ShapeType;
    point: Point;
}

export const canvasSlice = createSlice({
    name: "canvas",
    initialState: {
        items: {},
        history: newHistory<CanvasItems>({ items: {} }),
    } as CanvasStoreState,
    reducers: {
        add: (state, action: PayloadAction<NewItem>) => {
            const item = {
                key: uuid(),
                shape: action.payload.shape,
                point: action.payload.point,
            };
            state.items[item.key] = item;
            addToHistory(state, action.type);
        },
        move: (state, action: PayloadAction<ItemPosition>) => {
            state.items[action.payload.key].point = action.payload.point;
        },
        moveEnd: (state, action: PayloadAction<string>) => {
            const previous = currentHistory(state.history).items[
                action.payload
            ];
            const current = state.items[action.payload];
            if (isSamePosition(previous, current)) {
                return;
            }
            addToHistory(state, action.type);
        },
        select: (state, action: PayloadAction<string>) => {
            resetActive(state);
            state.items[action.payload].active = true;
            state.activeItemKey = action.payload;
        },
        resetSelected: (state) => {
            resetActive(state);
        },
        deleteSelected: (state) => {
            if (!state.activeItemKey) {
                return;
            }
            delete state.items[state.activeItemKey];
            state.activeItemKey = undefined;
            addToHistory(state, deleteSelected.type);
        },
        undo: (state) => {
            const previous = undoHistory(state.history);
            if (previous === undefined) {
                return;
            }
            setFromHistoryItems(state, previous);
        },
        redo: (state) => {
            const next = redoHistory(state.history);
            if (next === undefined) {
                return;
            }
            setFromHistoryItems(state, next);
        },
        setFromHistory: (state, action: PayloadAction<number>) => {
            if (
                action.payload < 0 ||
                action.payload >= state.history.items.length
            ) {
                return;
            }
            state.history.current = action.payload;
            const history = currentHistory(state.history);
            setFromHistoryItems(state, history);
        },
    },
});

function addToHistory(state: CanvasStoreState, action: string) {
    addHitory(state.history, action, {
        items: state.items,
        activeItemKey: state.activeItemKey,
    });
}

function setFromHistoryItems(state: CanvasStoreState, history: CanvasItems) {
    state.items = history.items;
    state.activeItemKey = history.activeItemKey;
    resetActive(state);
}

function resetActive(state: CanvasStoreState) {
    if (!state.activeItemKey) {
        return;
    }
    state.items[state.activeItemKey].active = undefined;
    state.activeItemKey = undefined;
}

function isSamePosition(a: CanvasItem, b: CanvasItem): boolean {
    return a.point.x == b.point.x && a.point.y == b.point.y;
}

export const {
    add,
    move,
    moveEnd,
    select,
    resetSelected,
    deleteSelected,
    undo,
    redo,
    setFromHistory,
} = canvasSlice.actions;

export default canvasSlice.reducer;
