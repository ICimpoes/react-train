import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "../models";
import { ShapeType } from "../Shapes";
import { v4 as uuid } from "uuid";

interface CanvasStoreState {
    elements: Record<string, CanvasElement>;
}

interface CanvasElement {
    key: string;
    shape: ShapeType;
    point: Point;
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
    },
});

export const { add, move } = canvasSlice.actions;

export default canvasSlice.reducer;
