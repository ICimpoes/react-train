import { configureStore } from "@reduxjs/toolkit";
import { canvasSlice } from "./canvasSlice";
import { dragSlice } from "./dragSlice";

export const shapesStore = configureStore({
    reducer: {
        canvas: canvasSlice.reducer,
        drag: dragSlice.reducer,
    },
});

export type RootState = ReturnType<typeof shapesStore.getState>;

export const selectCanvasElements = (state: RootState) => state.canvas.elements;

export const selectDragElement = (state: RootState) => state.drag.shape;

export type AppDispatch = typeof shapesStore.dispatch;
