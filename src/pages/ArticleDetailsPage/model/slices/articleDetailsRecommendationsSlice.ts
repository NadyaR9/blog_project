import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

const recommedationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations =
  recommedationsAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleDetailsPage?.recommedations ||
      recommedationsAdapter.getInitialState(),
  );

const articleDetailsRecommendationsSlice = createSlice({
  name: 'articleDetailsRecommendationsSlice',
  initialState:
    recommedationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
      isLoading: false,
      error: undefined,
      ids: [],
      entities: {},
    }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        recommedationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      });
  },
});

export const { reducer: articleDetailsRecommendationReducer } =
  articleDetailsRecommendationsSlice;
export const { actions: articleDetailsRecommendationActions } =
  articleDetailsRecommendationsSlice;
