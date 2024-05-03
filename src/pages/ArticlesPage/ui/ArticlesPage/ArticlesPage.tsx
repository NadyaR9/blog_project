/* eslint-disable max-len */
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { articlesReducer } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { fetchArticlesInited } from '../../model/services/fetchArticlesInited/fetchArticlesInited';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { Page } from '@/widgets/Page';
import { ToggleFeature } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ArticleViewSelectorContainer } from '../ArticleViewSelectorContainer/ArticleViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

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

  const content = (
    <ToggleFeature
      name="isAppRedesigned"
      off={
        <Page
          onScrollEnd={onLoadNextPage}
          className={classNames(cls.articlesPage, {}, [className])}
          data-testid="ArticlesPage"
        >
          <ArticlesPageFilters />
          {t('Articles Page')}
          <ArticleInfiniteList />
        </Page>
      }
      on={
        <StickyContentLayout
          content={
            <Page
              onScrollEnd={onLoadNextPage}
              className={classNames(cls.articlesPageRedesigned, {}, [
                className,
              ])}
              data-testid="ArticlesPage"
            >
              <ArticleInfiniteList />
            </Page>
          }
          left={<ArticleViewSelectorContainer />}
          right={<FiltersContainer />}
        />
      }
    />
  );
  return (
    <DynamicModuleLoader reducerList={reducerList} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
