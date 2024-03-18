/* eslint-disable max-len */
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  ArticleList, ArticleView,
} from '@/entites/Article';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/config/lib/components';
import { useAppDispatch } from '@/shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/config/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/shared/ui';
import {
  getArticlesIsLoading, getArticlesView,
} from '../../model/selectors/getArticlesSelectors';
import { articlesReducer, getArticles } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { fetchArticlesInited } from '../../model/services/fetchArticlesInited/fetchArticlesInited';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

interface ArticlesPageProps {
  className?: string;
}

const reducerList: ReducerList = {
  articles: articlesReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(fetchArticlesInited(searchParams));
  });

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducerList={reducerList} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPage}
        className={classNames(cls.articlesPage, {}, [className])}
      >
        <ArticlesPageFilters />
        {t('Articles Page')}
        <ArticleInfiniteList />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
