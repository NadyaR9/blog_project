import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UiDesignSwitchersSchema } from '../types/uiDesignSwitchersSchema';

const initialState: UiDesignSwitchersSchema = {};

export const uiDesignSwitchersSlice = createSlice({
  name: 'uiDesignSwitchers',
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {},
  },
  // extraReducers: (builder) => {
  //     builder
  //         .addCase(, (state) => {
  //             state.error = undefined;
  //             state.isLoading = true;
  //         })
  //         .addCase(, (state) => {
  //             state.isLoading = false;
  //         })
  //         .addCase(, (state, action) => {
  //             state.isLoading = false;
  //             state.error = action.payload;
  //         });
  // },
});

export const { actions: uiDesignSwitchersActions } = uiDesignSwitchersSlice;
export const { reducer: uiDesignSwitchersReducer } = uiDesignSwitchersSlice;
