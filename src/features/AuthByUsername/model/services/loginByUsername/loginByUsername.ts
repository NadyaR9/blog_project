import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (data: LoginByUsernameProps, thunkApi) => {
  const { dispatch, extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.post<User>('/login', data);
    if (!response.data) {
      throw new Error();
    }

    dispatch(userActions.setAuthData(response.data));
    return response.data;
  } catch (e) {
    return rejectWithValue('authError');
  }
});
