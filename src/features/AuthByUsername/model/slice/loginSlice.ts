import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import { LoginSchema } from '../types/LoginSchema';

const initialState: LoginSchema = {
  username: '',
  password: '',
  isLoading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false;
        state.error = initialState.error;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginByUsername.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { reducer: LoginReducer } = loginSlice;
export const { actions: LoginActions } = loginSlice;
