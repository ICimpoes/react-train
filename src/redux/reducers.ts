import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "../models";
import { ShapeType } from "../Shapes";
import { v4 as uuid } from "uuid";

interface StoreState {
    dragShape?: ShapeType;
    canvasElements: Record<string, CanvasElement>;
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

export const shapesSlice = createSlice({
    name: "shapes",
    initialState: {
        canvasElements: {},
    } as StoreState,
    reducers: {
        drag: (state, action: PayloadAction<ShapeType>) => {
            state.dragShape = action.payload;
        },
        resetDrag: (state) => {
            state.dragShape = undefined;
        },
        drop: (state, action: PayloadAction<Point>) => {
            if (!state.dragShape) {
                return;
            }

            const element = {
                key: uuid(),
                shape: state.dragShape,
                point: action.payload,
            };
            state.canvasElements[element.key] = element;
        },
        move: (state, action: PayloadAction<ElementPosition>) => {
            state.canvasElements[action.payload.key].point =
                action.payload.point;
        },
    },
});

export const { drag, resetDrag, drop, move } = shapesSlice.actions;

export default shapesSlice.reducer;
