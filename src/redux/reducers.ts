import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "../models";
import { ShapeType } from "../Shapes";

interface StoreState {
    dragShape?: ShapeType;
    canvasElements: CanvasElement[];
    selectedElement?: number;
}

interface CanvasElement {
    shape: ShapeType;
    point: Point;
}

export const shapesSlice = createSlice({
    name: "shapes",
    initialState: {
        canvasElements: [],
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
            state.canvasElements.push({
                shape: state.dragShape,
                point: action.payload,
            });
        },
        select: (state, action: PayloadAction<number>) => {
            state.selectedElement = action.payload;
        },
        resetSelected: (state) => {
            state.selectedElement = undefined;
        },
        move: (state, action: PayloadAction<Point>) => {
            if (state.selectedElement !== undefined) {
                state.canvasElements[state.selectedElement].point =
                    action.payload;
            }
        },
    },
});

export const { drag, resetDrag, drop, select, resetSelected, move } =
    shapesSlice.actions;

export default shapesSlice.reducer;
