import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getArticlesInited, getArticlesPage,
} from '../../selectors/getArticlesSelectors';
import { articlesActions } from '../../slices/articlesPageSlice';
import { fetchArticles } from '../fetchArticles/fetchArticles';

export const fetchArticlesInited = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articles/fetchArticlesInited',
  async (_, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const page = getArticlesPage(getState());
    const isInited = getArticlesInited(getState());
    if (!isInited) {
      dispatch(articlesActions.initState());
      dispatch(fetchArticles({
        page,
      }));
    }
  },
);
