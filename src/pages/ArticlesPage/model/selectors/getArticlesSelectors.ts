import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesError = (state: StateSchema) => state.articles?.error;
export const getArticlesIsLoading = (state: StateSchema) => state.articles?.isLoading || false;
export const getArticlesView = (state: StateSchema) => state.articles?.view;
export const getArticlesPage = (state: StateSchema) => state.articles?.page || 1;
export const getArticlesLimit = (state: StateSchema) => state.articles?.limit;
export const getArticlesHasMore = (state: StateSchema) => state.articles?.hasMore || false;
export const getArticlesInited = (state: StateSchema) => state.articles?._inited;
