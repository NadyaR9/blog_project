/* eslint-disable max-len */
import { ArticleList, ArticleView, ArticleViewSelector } from 'entites/Article';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/config/lib/components';
import { useAppDispatch } from 'shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/config/lib/hooks/useInitialEffect/useInitialEffect';
import { getArticlesError, getArticlesIsLoading, getArticlesView } from '../model/selectors/getArticlesSelectors';
import { fetchArticles } from '../model/services/fetchArticles/fetchArticles';
import { articlesActions, articlesReducer, getArticles } from '../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';

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
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesIsLoading);
  const view = useSelector(getArticlesView);
  const error = useSelector(getArticlesError);

  useInitialEffect(() => {
    dispatch(fetchArticles());
    dispatch(articlesActions.initState());
  });

  const onViewChange = useCallback((newView: ArticleView) => {
    dispatch(articlesActions.setView(newView));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducerList={reducerList}>
      <div className={classNames(cls.articlesPage, {}, [className])}>
        {t('Articles Page')}
        <ArticleViewSelector
          view={view}
          onViewChange={onViewChange}
        />
        <ArticleList
          articles={articles}
          isLoading={isLoading}
          view={view}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
