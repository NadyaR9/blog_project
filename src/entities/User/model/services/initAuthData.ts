import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataById } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const userId = JSON.parse(
      localStorage.getItem(USER_LOCALSTORAGE_KEY) ?? '',
    );

    if (!userId) {
      return rejectWithValue('');
    }
    try {
      const response = await dispatch(getUserDataById(userId)).unwrap();

      if (!response.id) return rejectWithValue('');

      return response;
    } catch (e) {
      console.log(e);
      return rejectWithValue('');
    }
  },
);
