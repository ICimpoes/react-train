import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "../models";
import { ShapeType } from "../Shapes";
import { v4 as uuid } from "uuid";

interface CanvasStoreState {
    items: CanvasItems;
    activeItemKey?: string;
    history: CanvasHistory;
}

export type CanvasItems = Record<string, CanvasItem>;

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

interface CanvasHistory {
    items: CanvasItems[];
    present: number;
}

export const canvasSlice = createSlice({
    name: "canvas",
    initialState: {
        items: {},
        history: {
            items: [{}],
            present: 0,
        },
    } as CanvasStoreState,
    reducers: {
        add: (state, action: PayloadAction<NewItem>) => {
            const item = {
                key: uuid(),
                shape: action.payload.shape,
                point: action.payload.point,
            };
            state.items[item.key] = item;
            addToHistory(state);
        },
        move: (state, action: PayloadAction<ItemPosition>) => {
            state.items[action.payload.key].point = action.payload.point;
        },
        moveEnd: (state, action: PayloadAction<string>) => {
            const previous =
                state.history.items[state.history.present][action.payload];
            const current = state.items[action.payload];
            if (isSamePosition(previous, current)) {
                return;
            }
            addToHistory(state);
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
            addToHistory(state);
        },
        undo: (state) => {
            state.activeItemKey = undefined;
            if (state.history.present == 0) {
                return;
            }
            state.history.present--;
            state.items = state.history.items[state.history.present];
        },
        redo: (state) => {
            state.activeItemKey = undefined;
            if (state.history.present >= state.history.items.length - 1) {
                return;
            }
            state.history.present++;
            state.items = state.history.items[state.history.present];
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

function addToHistory(state: CanvasStoreState) {
    state.history.present++;
    state.history.items = state.history.items.slice(0, state.history.present);
    state.history.items.push(state.items);
}

function isSamePosition(el1: CanvasItem, el2: CanvasItem): boolean {
    return el1.point.x == el2.point.x && el1.point.y == el2.point.y;
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
} = canvasSlice.actions;

export default canvasSlice.reducer;
