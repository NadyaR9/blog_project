import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const auth = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (auth) {
        state.authData = JSON.parse(auth);
      }
    },
    logoutUser: (state) => {
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
      state.authData = undefined;
    },
  },
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
