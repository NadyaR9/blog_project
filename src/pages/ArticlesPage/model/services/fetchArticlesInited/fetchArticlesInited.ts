import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleTypes } from '@/entities/Article';
import { SortOrder } from '@/shared/config/types';
import { getArticlesInited } from '../../selectors/getArticlesSelectors';
import { articlesActions } from '../../slices/articlesPageSlice';
import { fetchArticles } from '../fetchArticles/fetchArticles';

export const fetchArticlesInited = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articles/fetchArticlesInited', async (searchParams, thunkApi) => {
  const { dispatch, getState } = thunkApi;
  const isInited = getArticlesInited(getState());
  if (!isInited) {
    const orderFromUrl = searchParams.get('order') as SortOrder;
    const sortFromUrl = searchParams.get('sort') as ArticleSortField;
    const searchFromUrl = searchParams.get('search');
    const typeFromUrl = searchParams.get('type') as ArticleTypes;
    if (orderFromUrl) {
      dispatch(articlesActions.setOrder(orderFromUrl));
    }
    if (sortFromUrl) {
      dispatch(articlesActions.setSort(sortFromUrl));
    }
    if (searchFromUrl) {
      dispatch(articlesActions.setSearch(searchFromUrl));
    }
    if (typeFromUrl) {
      dispatch(articlesActions.setType(typeFromUrl));
    }
    dispatch(articlesActions.initState());
    dispatch(fetchArticles({}));
  }
});
