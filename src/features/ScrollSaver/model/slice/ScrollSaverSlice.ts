import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSaverSchema } from '../types/ScrollSchema';

const initialState: ScrollSaverSchema = {
  scroll: {},
};

export const ScrollSaverSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setSCrollPosition: (
      state,
      { payload }: PayloadAction<{ path: string; position: number }>,
    ) => {
      state.scroll[payload.path] = payload.position;
    },
  },
});

export const { reducer: ScrollSaverReducer } = ScrollSaverSlice;
export const { actions: ScrollSaverActions } = ScrollSaverSlice;
