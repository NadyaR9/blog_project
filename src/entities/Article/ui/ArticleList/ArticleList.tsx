import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/consts';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';
import { ToggleFeature } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  view?: ArticleView;
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => <ArticleListItemSkeleton view={view} key={index} />);

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading = false,
    target = '_self',
  } = props;

  const renderArticleList = useCallback(
    () =>
      articles.map((article) => (
        <ArticleListItem
          article={article}
          view={view}
          key={article.id}
          target={target}
        />
      )),
    [articles, view, target],
  );

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <HStack
          gap="16"
          wrap="wrap"
          className={classNames(cls.ArticleListRedesigned, {}, [])}
          data-testid="ArticleList"
        >
          {articles?.length ? renderArticleList() : null}
          {isLoading && (
            <div
              className={classNames(cls.ArticleList, {}, [
                className,
                cls[view],
              ])}
            >
              {getSkeletons(view)}
            </div>
          )}
        </HStack>
      }
      off={
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
          data-testid="ArticleList"
        >
          {articles?.length ? renderArticleList() : null}
          {isLoading && (
            <div
              className={classNames(cls.ArticleList, {}, [
                className,
                cls[view],
              ])}
            >
              {getSkeletons(view)}
            </div>
          )}
        </div>
      }
    />
  );
});
