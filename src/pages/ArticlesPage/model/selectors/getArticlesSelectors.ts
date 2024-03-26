import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleTypes } from '@/entities/Article';

export const getArticlesError = (state: StateSchema) => state.articles?.error;
export const getArticlesIsLoading = (state: StateSchema) => state.articles?.isLoading;
export const getArticlesView = (state: StateSchema) => state.articles?.view;
export const getArticlesPage = (state: StateSchema) => state.articles?.page || 1;
export const getArticlesLimit = (state: StateSchema) => state.articles?.limit;
export const getArticlesHasMore = (state: StateSchema) => state.articles?.hasMore;
export const getArticlesInited = (state: StateSchema) => state.articles?._inited;
export const getArticlesSearch = (state: StateSchema) => state.articles?.search ?? '';
export const getArticlesSort = (state: StateSchema) => state.articles?.sort ?? ArticleSortField.CREATED;
export const getArticlesOrder = (state: StateSchema) => state.articles?.order ?? 'asc';
export const getArticlesType = (state: StateSchema) => state.articles?.type ?? ArticleTypes.ALL;
