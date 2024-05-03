import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  getArticlesOrder,
  getArticlesSearch,
  getArticlesSort,
  getArticlesType,
} from '../../model/selectors/getArticlesSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import { ArticleSortField, ArticleTypes } from '@/entities/Article';
import { SortOrder } from '@/shared/config/types';
import { articlesActions } from '../../model/slices/articlesPageSlice';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

export function useArticlePageFiltersts() {
  const dispatch = useAppDispatch();
  const order = useSelector(getArticlesOrder);
  const sort = useSelector(getArticlesSort);
  const search = useSelector(getArticlesSearch);
  const type = useSelector(getArticlesType);

  const fetachData = useCallback(() => {
    dispatch(fetchArticles({ replace: true }));
  }, [dispatch]);

  const debouncedFetachData = useDebounce(fetachData, 800);

  const onSortChange = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesActions.setSort(newSort));
      dispatch(articlesActions.setPage(1));
      fetachData();
    },
    [dispatch, fetachData],
  );

  const onOrderChange = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesActions.setOrder(newOrder));
      dispatch(articlesActions.setPage(1));
      fetachData();
    },
    [dispatch, fetachData],
  );

  const onSearchChange = useCallback(
    (search: string) => {
      dispatch(articlesActions.setSearch(search));
      dispatch(articlesActions.setPage(1));
      debouncedFetachData();
    },
    [dispatch, debouncedFetachData],
  );

  const onTabChange = useCallback(
    (tab: ArticleTypes) => {
      dispatch(articlesActions.setType(tab));
      dispatch(articlesActions.setPage(1));
      fetachData();
    },
    [dispatch, fetachData],
  );
  return {
    order,
    sort,
    search,
    type,
    onSortChange,
    onOrderChange,
    onSearchChange,
    onTabChange,
  };
}
