import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleFilters.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import SearchIcon from '@/shared/assets/icons/redesigned/Search.svg';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleSortField, ArticleTypes } from '@/entities/Article';
import { SortOrder } from '@/shared/config/types';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticleFiltersProps {
  className?: string;
  search: string;
  onSearchChange: (search: string) => void;
  sort: ArticleSortField;
  onSortChange: (sort: ArticleSortField) => void;
  order: SortOrder;
  onOrderChange: (order: SortOrder) => void;
  type: ArticleTypes;
  onTabChange: (tab: ArticleTypes) => void;
}

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
  const {
    className,
    search,
    onSearchChange,
    sort,
    onSortChange,
    order,
    onOrderChange,
    type,
    onTabChange,
  } = props;
  const { t } = useTranslation();

  return (
    <Card
      className={classNames(cls.ArticleFilters, {}, [className])}
      padding="24"
    >
      <VStack gap="32">
        <Input
          placeholder={t('Search')}
          value={search}
          onChange={onSearchChange}
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleTypeTabs value={type} onChange={onTabChange} />
        <ArticleSortSelector
          sort={sort}
          onChangeSort={onSortChange}
          order={order}
          onChangeOrder={onOrderChange}
        />
      </VStack>
    </Card>
  );
});
