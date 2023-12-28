import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { State, DispatchType } from './todo_store';

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
