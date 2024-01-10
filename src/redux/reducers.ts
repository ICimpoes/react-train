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
    active?: boolean;
}

export const shapesSlice = createSlice({
    name: "shapes",
    initialState: {
        canvasElements: [],
    } as StoreState,
    reducers: {
        drag: (state, action: PayloadAction<ShapeType | undefined>) => {
            state.dragShape = action.payload;
        },
        drop: (state, action: PayloadAction<Point>) => {
            if (!state.dragShape) {
                return;
            }
            state.canvasElements.map((element) => {
                element.active = false;
            });
            state.canvasElements.push({
                shape: state.dragShape,
                point: action.payload,
            });
        },
        select: (state, action: PayloadAction<number>) => {
            state.canvasElements.map((element) => {
                element.active = false;
            });
            state.canvasElements[action.payload].active = true;
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
        resetActive: (state) => {
            state.canvasElements.map((element) => {
                element.active = false;
            });
        },
        deleteActive: (state) => {
            state.canvasElements = state.canvasElements.filter((element) => {
                return !element.active;
            });
        },
    },
});

export const {
    drag,
    drop,
    select,
    resetSelected,
    move,
    deleteActive,
    resetActive,
} = shapesSlice.actions;

export default shapesSlice.reducer;
