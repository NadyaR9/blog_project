import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entites/User';
import i18n from 'shared/config/i18n/i18n';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
  username: string,
  password: string,
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
  'login/loginByUsername',
  async (data: LoginByUsernameProps, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/login', data);
      if (!response.data) {
        throw new Error();
      }
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      thunkAPI.dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('authError');
    }
  },
);
