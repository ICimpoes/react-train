import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TodoItem = {
    id: number,
    title: string
}

const todoItems = {
    items: new Array<TodoItem>(
        { id: 1, title: "todo # 1" },
        { id: 2, title: "todo # 2" },
        { id: 3, title: "todo # 3" }
    )
};

const reducers = createSlice({
    name: 'todo',
    initialState: todoItems,
    reducers: {
        addItem: (state, action: PayloadAction<string>) => {
            state.items.push({ id: new Date().getTime(), title: action.payload });
            console.log("added item new items:", state.items.map((i) => i.title + i.id));
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => { return item.id !== action.payload; });
            console.log("remove item new items:", state.items.map((i) => i.title + i.id));
        }
    }
});

export const todoStore = configureStore({
    reducer: reducers.reducer
})

export default todoStore;
export const { addItem, removeItem } = reducers.actions;
export type DispatchType = typeof todoStore.dispatch;
export type State = ReturnType<typeof todoStore.getState>;
export const todoSelector = (state: State) => state.items;
