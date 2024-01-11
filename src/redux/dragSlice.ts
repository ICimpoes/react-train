import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShapeType } from "../Shapes";

interface DragStoreType {
    shape?: ShapeType;
}

export const dragSlice = createSlice({
    name: "drag",
    initialState: {} as DragStoreType,
    reducers: {
        drag: (state, action: PayloadAction<ShapeType>) => {
            state.shape = action.payload;
        },
        resetDrag: (state) => {
            state.shape = undefined;
        },
    },
});

export const { drag, resetDrag } = dragSlice.actions;
