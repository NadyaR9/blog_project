import { memo } from 'react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { ArticleList } from 'entites/Article';
import { getArticles } from '../../model/slices/articlesPageSlice';
import { getArticlesIsLoading, getArticlesView } from '../../model/selectors/getArticlesSelectors';

interface ArticleInfiniteListProps {
  className?: string,
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesIsLoading);
  const view = useSelector(getArticlesView);

  return (
    <div className={classNames('', {}, [className])}>
      <ArticleList
        articles={articles}
        isLoading={isLoading}
        view={view}
      />
    </div>
  );
});
