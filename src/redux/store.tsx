import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
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

const shapesSlice = createSlice({
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

export const shapesStore = configureStore({
    reducer: {
        shapes: shapesSlice.reducer,
    },
});

export const { drag, drop, select, resetSelected, move } = shapesSlice.actions;

export default shapesSlice.reducer;

export type RootState = ReturnType<typeof shapesStore.getState>;

export const selectCanvasElements = (state: RootState) =>
    state.shapes.canvasElements;

export type AppDispatch = typeof shapesStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
