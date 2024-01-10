import { configureStore } from "@reduxjs/toolkit";
import { shapesSlice } from "./reducers";

export const shapesStore = configureStore({
    reducer: {
        shapes: shapesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof shapesStore.getState>;

export const selectCanvasElements = (state: RootState) =>
    state.shapes.canvasElements;

export type AppDispatch = typeof shapesStore.dispatch;
