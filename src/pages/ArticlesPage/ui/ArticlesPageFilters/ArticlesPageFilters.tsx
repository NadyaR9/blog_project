import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import {
  ArticleOrderSelector,
  ArticleSortField,
  ArticleSortSelector,
  ArticleView, ArticleViewSelector,
  ArticleTypes,
  ArticleTypeTabs,
} from 'entites/Article';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Card, Input, TabItem, Tabs,
} from 'shared/ui';
import { SortOrder } from 'shared/config/types';
import { useDebounce } from 'shared/config/lib/hooks/useDebounce/useDebounce';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import {
  getArticlesOrder, getArticlesSearch, getArticlesSort, getArticlesType, getArticlesView,
} from '../../model/selectors/getArticlesSelectors';
import { articlesActions } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPageFilters.module.scss';

interface FiltersProps {
  className?: string,
}

export const ArticlesPageFilters = memo((props: FiltersProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const view = useSelector(getArticlesView);
  const order = useSelector(getArticlesOrder);
  const sort = useSelector(getArticlesSort);
  const search = useSelector(getArticlesSearch);
  const type = useSelector(getArticlesType);

  const onViewChange = useCallback((newView: ArticleView) => {
    dispatch(articlesActions.setView(newView));
  }, [dispatch]);

  const fetachData = useCallback(() => {
    dispatch(fetchArticles({ replace: true }));
  }, [dispatch]);

  const debouncedFetachData = useDebounce(fetachData, 800);

  const onSortChange = useCallback((newSort: ArticleSortField) => {
    dispatch(articlesActions.setSort(newSort));
    dispatch(articlesActions.setPage(1));
    fetachData();
  }, [dispatch, fetachData]);

  const onOrderChange = useCallback((newOrder: SortOrder) => {
    dispatch(articlesActions.setOrder(newOrder));
    dispatch(articlesActions.setPage(1));
    fetachData();
  }, [dispatch, fetachData]);

  const onSearchChange = useCallback((search: string) => {
    dispatch(articlesActions.setSearch(search));
    dispatch(articlesActions.setPage(1));
    debouncedFetachData();
  }, [dispatch, debouncedFetachData]);

  const onTabChange = useCallback((tab: ArticleTypes) => {
    dispatch(articlesActions.setType(tab));
    dispatch(articlesActions.setPage(1));
    fetachData();
  }, [dispatch, fetachData]);

  return (
    <div className={classNames(cls.Filters, {}, [className])}>
      <div className={cls.filtersWrapper}>
        <div className={cls.sortFilter}>
          <ArticleSortSelector
            sort={sort}
            onChange={onSortChange}
          />
          <ArticleOrderSelector
            order={order}
            onChange={onOrderChange}
          />
        </div>
        <ArticleViewSelector
          view={view}
          onViewChange={onViewChange}
        />
      </div>
      <Card className={cls.search}>
        <Input
          placeholder={t('Search')}
          value={search}
          onChange={onSearchChange}
        />
      </Card>
      <ArticleTypeTabs
        value={type}
        onChange={onTabChange}
      />
    </div>
  );
});