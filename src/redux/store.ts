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

export const selectCanvasItems = (state: RootState) => state.canvas.items;

export const selectDragItem = (state: RootState) => state.drag.shape;

export type AppDispatch = typeof shapesStore.dispatch;
