import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  Select as SelectDeprecated,
  SelectOption,
} from '@/shared/ui/deprecated/Select';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeature } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { SortOrder } from '@/shared/config/types';
import cls from './ArticleSortSelector.module.scss';

interface FieldsFilterProps {
  className?: string;
  sort: ArticleSortField;
  onChangeSort: (sort: ArticleSortField) => void;
  order: SortOrder;
  onChangeOrder: (order: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: FieldsFilterProps) => {
  const { className, sort, onChangeSort, order, onChangeOrder } = props;
  const { t } = useTranslation('articles');

  const sortOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('created at'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('title'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('views'),
      },
    ],
    [t],
  );
  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('asc'),
      },
      {
        value: 'desc',
        content: t('desc'),
      },
    ],
    [t],
  );
  return (
    <ToggleFeature
      on={
        <VStack gap="8">
          <Text text={t('Filter by')} />
          <ListBox
            onChange={onChangeSort}
            value={sort}
            items={sortOptions}
            className={classNames('', {}, [className])}
            directions="bottom left"
          />
          <ListBox
            value={order}
            onChange={onChangeOrder}
            items={orderOptions}
            className={classNames('', {}, [className])}
            directions="bottom left"
          />
        </VStack>
      }
      off={
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
          <SelectDeprecated
            onChange={onChangeSort}
            value={sort}
            options={sortOptions}
            label={t('Filter by')}
            className={classNames('', {}, [className])}
          />
          <SelectDeprecated
            value={order}
            onChange={onChangeOrder}
            options={orderOptions}
            label={t('Sort label')}
            className={classNames('', {}, [className])}
          />
        </div>
      }
      name="isAppRedesigned"
    />
  );
});
