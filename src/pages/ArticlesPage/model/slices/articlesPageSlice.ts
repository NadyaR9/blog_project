import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
  Article, ArticleSortField, ArticleTypes, ArticleView,
} from '@/entites/Article';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/config/types';
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
    sort: ArticleSortField.CREATED,
    order: 'asc',
    search: '',
    limit: 9,
    type: ArticleTypes.ALL,
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
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleTypes>) => {
      state.type = action.payload;
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
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasMore = action.payload.length > state.limit;
        if (action.meta.arg.replace) {
          Adapter.setAll(state, action.payload);
        } else {
          Adapter.addMany(state, action.payload);
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchArticles.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;
        if (action.meta.arg.replace) {
          Adapter.removeAll(state);
        }
      });
  },
});

export const { reducer: articlesReducer } = articlesSlice;
export const { actions: articlesActions } = articlesSlice;
