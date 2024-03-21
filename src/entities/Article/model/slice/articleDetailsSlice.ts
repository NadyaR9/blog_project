import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleDetailsData } from '../services/fetchArticleDetailsData/fetchArticleDetailsData';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleDetailsData.fulfilled, (state, action:PayloadAction<Article>) => {
        state.isLoading = false;
        state.error = initialState.error;
        state.data = action.payload;
      })
      .addCase(fetchArticleDetailsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchArticleDetailsData.pending, (state) => {
        state.isLoading = true;
        state.error = initialState.error;
      });
  },
});

export const { reducer: articleDetailsReducer } = articleDetailsSlice;
export const { actions: articleDetailsActions } = articleDetailsSlice;
