import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeaturesFlag } from '@/shared/config/types/featuresFlag';
import { updateFeaturesFlagsMutation } from '../api/featuresFlagApi';
import { getAllFeatureFlags } from '../lib/setGetFeaturesFlag';

interface updatefeatureFlagOptions {
  userId: string;
  newFeatures: Partial<FeaturesFlag>;
}

export const updateFeatureFlags = createAsyncThunk<
  void,
  updatefeatureFlagOptions,
  ThunkConfig<string>
>('features/updateFeatureFlags', async ({ userId, newFeatures }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;
  try {
    await dispatch(
      updateFeaturesFlagsMutation({
        userId,
        features: {
          ...getAllFeatureFlags(),
          ...newFeatures,
        },
      }),
    ).unwrap();

    window.location.reload();
    return undefined;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
