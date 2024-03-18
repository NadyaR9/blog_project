import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
  getArticlesHasMore, getArticlesIsLoading, getArticlesPage,
} from '../../selectors/getArticlesSelectors';
import { articlesActions } from '../../slices/articlesPageSlice';
import { fetchArticles } from '../fetchArticles/fetchArticles';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articles/fetchNextArticlesPage',
  async (_, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const hasMore = getArticlesHasMore(getState());
    const page = getArticlesPage(getState());
    const isLoading = getArticlesIsLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(articlesActions.setPage(page + 1));
      dispatch(fetchArticles({}));
    }
  },
);
