import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollSaver = (state: StateSchema) => state.scrollSaver.scroll;
export const getScrollSaverByPath = createSelector(
  getScrollSaver,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
