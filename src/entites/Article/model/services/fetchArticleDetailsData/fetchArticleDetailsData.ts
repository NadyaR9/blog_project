import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleDetailsData = createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
  'articles/fetchArticleDetailsData',
  async (id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<Article>(`/articles/${id}`);
      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (e) {
      return rejectWithValue('fetchProfileDataError');
    }
  },
);
