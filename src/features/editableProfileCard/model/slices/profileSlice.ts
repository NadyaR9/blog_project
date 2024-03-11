import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'entites/Profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  data: undefined,
  form: undefined,
  error: undefined,
  validateErrors: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    cancelEdit: (state) => {
      state.readonly = true;
      state.form = state.data;
      state.validateErrors = initialState.validateErrors;
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    saveProfile: (state) => {
      state.data = state.form;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.fulfilled, (state, action:PayloadAction<Profile>) => {
        state.isLoading = false;
        state.error = initialState.error;
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfileData.pending, (state) => {
        state.isLoading = true;
        state.error = initialState.error;
      })
      .addCase(updateProfileData.fulfilled, (state, action:PayloadAction<Profile>) => {
        state.isLoading = false;
        state.error = initialState.error;
        state.validateErrors = initialState.validateErrors;
        state.data = action.payload;
        state.readonly = true;
        state.form = action.payload;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.validateErrors = action.payload;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;
        state.validateErrors = initialState.validateErrors;
      });
  },
});

export const { reducer: profileReducer } = profileSlice;
export const { actions: profileActions } = profileSlice;
