import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "../models";
import { ShapeType } from "../Shapes";
import { v4 as uuid } from "uuid";

interface CanvasStoreState {
    elements: CanvasElements;
    activeElementKey?: string;
    history: CanvasHistory;
}

type CanvasElements = Record<string, CanvasElement>;

interface CanvasElement {
    key: string;
    shape: ShapeType;
    point: Point;
    active?: boolean;
}

interface ElementPosition {
    key: string;
    point: Point;
}

interface NewElement {
    shape: ShapeType;
    point: Point;
}

interface CanvasHistory {
    elements: CanvasElements[];
    present: number;
}

export const canvasSlice = createSlice({
    name: "canvas",
    initialState: {
        elements: {},
        history: {
            elements: [{}],
            present: 0,
        },
    } as CanvasStoreState,
    reducers: {
        add: (state, action: PayloadAction<NewElement>) => {
            const element = {
                key: uuid(),
                shape: action.payload.shape,
                point: action.payload.point,
            };
            state.elements[element.key] = element;
            addToHistory(state);
        },
        move: (state, action: PayloadAction<ElementPosition>) => {
            state.elements[action.payload.key].point = action.payload.point;
        },
        moveEnd: (state, action: PayloadAction<string>) => {
            const previousPosition =
                state.history.elements[state.history.present][action.payload]
                    .point;
            const currentPosition = state.elements[action.payload].point;
            console.log(currentPosition, previousPosition);
            if (
                previousPosition.x === currentPosition.x &&
                previousPosition.y === currentPosition.y
            ) {
                return;
            }
            addToHistory(state);
        },
        select: (state, action: PayloadAction<string>) => {
            resetActive(state);
            state.elements[action.payload].active = true;
            state.activeElementKey = action.payload;
        },
        resetSelected: (state) => {
            resetActive(state);
        },
        deleteSelected: (state) => {
            if (!state.activeElementKey) {
                return;
            }
            delete state.elements[state.activeElementKey];
            state.activeElementKey = undefined;
            addToHistory(state);
        },
        undo: (state) => {
            state.activeElementKey = undefined;
            if (state.history.present == 0) {
                return;
            }
            state.history.present--;
            state.elements = state.history.elements[state.history.present];
        },
        redo: (state) => {
            state.activeElementKey = undefined;
            if (state.history.present >= state.history.elements.length - 1) {
                return;
            }
            state.history.present++;
            state.elements = state.history.elements[state.history.present];
        },
    },
});

function resetActive(state: CanvasStoreState) {
    if (!state.activeElementKey) {
        return;
    }
    state.elements[state.activeElementKey].active = undefined;
    state.activeElementKey = undefined;
}

function addToHistory(state: CanvasStoreState) {
    state.history.present++;
    state.history.elements = state.history.elements.slice(
        0,
        state.history.present
    );
    state.history.elements.push(state.elements);
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
