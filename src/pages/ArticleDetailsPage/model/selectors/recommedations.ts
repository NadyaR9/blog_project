import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationsIsLoading = (state: StateSchema) => {
  return state.articleDetailsPage?.recommedations?.isLoading || false;
};
export const getArticleRecommendationsError = (state: StateSchema) => state.articleDetailsPage?.recommedations?.error;
