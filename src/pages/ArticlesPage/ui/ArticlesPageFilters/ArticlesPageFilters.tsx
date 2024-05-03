import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPageFilters.module.scss';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelectorContainer } from '../ArticleViewSelectorContainer/ArticleViewSelectorContainer';
import { useArticlePageFiltersts } from '../../lib/hooks/useArticlePageFilters';

interface FiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: FiltersProps) => {
  const { className } = props;
  const { t } = useTranslation('articles');
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
    <div className={classNames(cls.Filters, {}, [className])}>
      <div className={cls.filtersWrapper}>
        <div className={cls.sortFilter}>
          <ArticleSortSelector
            sort={sort}
            onChangeSort={onSortChange}
            order={order}
            onChangeOrder={onOrderChange}
          />
        </div>
        <ArticleViewSelectorContainer />
      </div>
      <CardDeprecated className={cls.search}>
        <InputDeprecated
          placeholder={t('Search')}
          value={search}
          onChange={onSearchChange}
        />
      </CardDeprecated>
      <ArticleTypeTabs value={type} onChange={onTabChange} />
    </div>
  );
});
