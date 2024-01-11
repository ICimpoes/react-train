import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "../models";
import { ShapeType } from "../Shapes";
import { v4 as uuid } from "uuid";

interface StoreState {
    dragShape?: ShapeType;
    canvasElements: Record<string, CanvasElement>;
    selectedElement?: string;
}

interface CanvasElement {
    key: string;
    shape: ShapeType;
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
        select: (state, action: PayloadAction<string>) => {
            state.selectedElement = action.payload;
        },
        resetSelected: (state) => {
            state.selectedElement = undefined;
        },
        move: (state, action: PayloadAction<Point>) => {
            if (state.selectedElement === undefined) {
                return;
            }

            state.canvasElements[state.selectedElement].point = action.payload;
        },
    },
});

export const { drag, resetDrag, drop, select, resetSelected, move } =
    shapesSlice.actions;

export default shapesSlice.reducer;
