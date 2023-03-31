import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entites/Article';

export const fetchArticles = createAsyncThunk<Article[], undefined, ThunkConfig<string>>(
  'articles/fetchArticles',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
        },
      });
      console.log('response', response.data);
      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (e) {
      return rejectWithValue('fetchArticlesError');
    }
  },
);
