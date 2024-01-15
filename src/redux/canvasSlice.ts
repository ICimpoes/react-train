import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "../models";
import { ShapeType } from "../Shapes";
import { v4 as uuid } from "uuid";
import {
    History,
    historyCurrent,
    addHitory,
    newHistory,
    reduHistory,
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
            addHitory(state.history, action.type, {
                items: state.items,
                activeItemKey: state.activeItemKey,
            });
        },
        move: (state, action: PayloadAction<ItemPosition>) => {
            state.items[action.payload.key].point = action.payload.point;
        },
        moveEnd: (state, action: PayloadAction<string>) => {
            const previous = historyCurrent(state.history).items[
                action.payload
            ];
            const current = state.items[action.payload];
            if (isSamePosition(previous, current)) {
                return;
            }
            addHitory(state.history, action.type, {
                items: state.items,
                activeItemKey: state.activeItemKey,
            });
        },
        select: (state, action: PayloadAction<string>) => {
            resetActive(state);
            state.items[action.payload].active = true;
            state.activeItemKey = action.payload;
        },
        resetSelected: (state) => {
            resetActive(state);
        },
        deleteSelected: (state, action: PayloadAction<unknown>) => {
            if (!state.activeItemKey) {
                return;
            }
            delete state.items[state.activeItemKey];
            state.activeItemKey = undefined;
            addHitory(state.history, action.type, {
                items: state.items,
                activeItemKey: state.activeItemKey,
            });
        },
        undo: (state) => {
            const previous = undoHistory(state.history);
            if (previous === undefined) {
                return;
            }
            state.items = previous.items;
            state.activeItemKey = previous.activeItemKey;
            resetActive(state);
        },
        redo: (state) => {
            const next = reduHistory(state.history);
            if (next === undefined) {
                return;
            }
            state.items = next.items;
            state.activeItemKey = next.activeItemKey;
            resetActive(state);
        },
        setFromHistory: (state, action: PayloadAction<number>) => {
            if (
                action.payload < 0 ||
                action.payload >= state.history.items.length
            ) {
                return;
            }
            state.history.current = action.payload;
            const history = historyCurrent(state.history);
            state.items = history.items;
            state.activeItemKey = history.activeItemKey;
            resetActive(state);
        },
    },
});

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
