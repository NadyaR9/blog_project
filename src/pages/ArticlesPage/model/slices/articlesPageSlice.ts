import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entites/Article';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { fetchArticles } from '../services/fetchArticles/fetchArticles';

import { ArticlesPageSchema } from '../types/articlesPageSchema';

const Adapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticles = Adapter.getSelectors<StateSchema>(
  (state) => state.articles || Adapter.getInitialState(),
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: Adapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    view: ArticleView.SMALL,
    articles: [],
    ids: [],
    entities: {},
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    initState: (state) => {
      state.view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action:PayloadAction<Article[]>) => {
        state.isLoading = false;
        Adapter.setAll(state, action.payload);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      });
  },
});

export const { reducer: articlesReducer } = articlesSlice;
export const { actions: articlesActions } = articlesSlice;
