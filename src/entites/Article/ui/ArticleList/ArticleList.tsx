import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/consts';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string,
  articles: Article[],
  view?: ArticleView,
  isLoading?: boolean,
  target?: HTMLAttributeAnchorTarget,
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
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

  const renderArticleList = useCallback(() => articles.map((article) => (
    <ArticleListItem
      article={article}
      view={view}
      key={article.id}
      target={target}
    />
  )), [articles, view, target]);

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles?.length ? renderArticleList() : null}
      {isLoading && (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
          {getSkeletons(view)}
        </div>
      )}
    </div>
  );
});
