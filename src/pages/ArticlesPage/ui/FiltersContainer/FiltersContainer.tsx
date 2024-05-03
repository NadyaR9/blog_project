import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleFilters } from '@/widgets/ArticleFilters';
import { useArticlePageFiltersts } from '../../lib/hooks/useArticlePageFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;
  const {
    order,
    sort,
    search,
    type,
    onSortChange,
    onOrderChange,
    onSearchChange,
    onTabChange,
  } = useArticlePageFiltersts();

  return (
    <ArticleFilters
      className={classNames('', {}, [className])}
      order={order}
      sort={sort}
      search={search}
      type={type}
      onSortChange={onSortChange}
      onOrderChange={onOrderChange}
      onSearchChange={onSearchChange}
      onTabChange={onTabChange}
    />
  );
});
