import { EntityState } from '@reduxjs/toolkit';
import {
  Article, ArticleSortField, ArticleTypes, ArticleView,
} from '@/entites/Article';
import { SortOrder } from '@/shared/config/types';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean,
  error?: string,
  articles?: Article[],
  page: number,
  limit: number,
  hasMore: boolean,
  _inited: boolean,
  view: ArticleView,
  order: SortOrder,
  sort: ArticleSortField,
  search: string,
  type: ArticleTypes,
}
