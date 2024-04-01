import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleTypes } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
  getArticlesLimit,
  getArticlesOrder,
  getArticlesPage,
  getArticlesSearch,
  getArticlesSort,
  getArticlesType,
} from '../../selectors/getArticlesSelectors';

interface fetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticles = createAsyncThunk<
  Article[],
  fetchArticlesListProps,
  ThunkConfig<string>
>('articles/fetchArticles', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const limit = getArticlesLimit(getState());
  const order = getArticlesOrder(getState());
  const sort = getArticlesSort(getState());
  const search = getArticlesSearch(getState());
  const page = getArticlesPage(getState());
  const type = getArticlesType(getState());
  try {
    addQueryParams({
      order,
      sort,
      search,
      type,
    });
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
        _order: order,
        _sort: sort,
        q: search,
        type_like: type === ArticleTypes.ALL ? undefined : type,
      },
    });
    if (!response.data) {
      throw new Error();
    }
    return response.data;
  } catch (e) {
    return rejectWithValue('fetchArticlesError');
  }
});
