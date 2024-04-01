import { combineReducers } from '@reduxjs/toolkit';
import { ArticlesDetailsPageSchema } from '../types';
import { articleDetailsRecommendationReducer } from './articleDetailsRecommendationsSlice';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

export const articleDetailsPageReducer =
  combineReducers<ArticlesDetailsPageSchema>({
    recommedations: articleDetailsRecommendationReducer,
    comments: articleDetailsCommentsReducer,
  });
