import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entites/Article';
import { getArticlesLimit } from '../../selectors/getArticlesSelectors';

interface fetchArticlesListProps {
  page?: number;
}

export const fetchArticles = createAsyncThunk<Article[], fetchArticlesListProps, ThunkConfig<string>>(
  'articles/fetchArticles',
  async (params, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const { page = 1 } = params;
    const limit = getArticlesLimit(getState());
    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
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
