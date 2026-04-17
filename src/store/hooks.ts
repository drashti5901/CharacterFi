/**
 * @file store/hooks.ts
 * @description Typed Redux hooks for use across the app.
 * useAppDispatch — pre-typed dispatch for thunks and actions.
 * useAppSelector — pre-typed selector with RootState inference.
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
