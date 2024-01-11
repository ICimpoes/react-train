import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "../models";
import { ShapeType } from "../Shapes";
import { v4 as uuid } from "uuid";

interface CanvasStoreState {
    elements: Record<string, CanvasElement>;
    activeElementKey?: string;
}

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

export const canvasSlice = createSlice({
    name: "canvas",
    initialState: {
        elements: {},
    } as CanvasStoreState,
    reducers: {
        add: (state, action: PayloadAction<NewElement>) => {
            const element = {
                key: uuid(),
                shape: action.payload.shape,
                point: action.payload.point,
            };
            state.elements[element.key] = element;
        },
        move: (state, action: PayloadAction<ElementPosition>) => {
            state.elements[action.payload.key].point = action.payload.point;
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
            console.log("delete", state.activeElementKey, state.elements);
            delete state.elements[state.activeElementKey];
            state.activeElementKey = undefined;
            console.log("deleted", state.activeElementKey, state.elements);
        },
    },
});

function resetActive(state: CanvasStoreState) {
    if (!state.activeElementKey) {
        return;
    }
    state.elements[state.activeElementKey].active = undefined;
}

export const { add, move, select, resetSelected, deleteSelected } =
    canvasSlice.actions;

export default canvasSlice.reducer;
