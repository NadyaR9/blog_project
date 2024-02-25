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
    hasMore: false,
    page: 1,
    _inited: false,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      state.limit = action.payload === ArticleView.BIG ? 4 : 9;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.BIG ? 4 : 9;
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action:PayloadAction<Article[]>) => {
        state.isLoading = false;
        Adapter.addMany(state, action.payload);
        state.hasMore = action.payload.length > 0;
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
