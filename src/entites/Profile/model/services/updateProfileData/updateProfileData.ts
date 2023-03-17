import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/updateProfileData',
  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const form = getProfileForm(getState());
    try {
      const response = await extra.api.put<Profile>('/profile', form);
      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (e) {
      return rejectWithValue('authError');
    }
  },
);