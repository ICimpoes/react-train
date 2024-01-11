import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point } from "../models";
import { ShapeType } from "../Shapes";

interface StoreState {
    dragShape?: ShapeType;
    canvasElements: CanvasElement[];
    selectedElement?: number;
    history: CanvasHistory[];
}

interface CanvasHistory {
    elements: CanvasElement[];
    date: string;
    action: string;
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
        history: [
            {
                action: "start",
                date: new Date().toString(),
                elements: [],
            },
        ],
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
            state.history.push({
                action: action.type,
                date: new Date().toString(),
                elements: state.canvasElements.slice(),
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
            if (state.selectedElement !== undefined) {
                state.history.push({
                    action: "move end",
                    date: new Date().toString(),
                    elements: state.canvasElements.slice(),
                });
                state.selectedElement = undefined;
            }
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
            const filteredElements = state.canvasElements.filter((element) => {
                return !element.active;
            });
            if (filteredElements.length != state.canvasElements.length) {
                state.canvasElements = filteredElements;
                state.history.push({
                    action: "delete",
                    date: new Date().toString(),
                    elements: state.canvasElements.slice(),
                });
            }
        },
        undo: (state) => {
            if (state.history.length === 1) {
                state.canvasElements = [];
                return;
            }
            const elements = state.history.pop();
            if (elements) {
                state.canvasElements = elements.elements;
            }
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
    undo,
} = shapesSlice.actions;

export default shapesSlice.reducer;
