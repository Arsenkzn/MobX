import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action, Dispatch } from "redux";
import type { RootState } from "src/store/store";

export const useAppDispatch = () => useDispatch<Dispatch<Action>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
