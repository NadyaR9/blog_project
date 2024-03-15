import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui';
import { ArticleSortField } from '../../model/consts/consts';

interface FieldsFilterProps {
  className?: string,
  sort: ArticleSortField,
  onChange: (sort: ArticleSortField) => void,
}

export const ArticleSortSelector = memo((props: FieldsFilterProps) => {
  const { className, sort, onChange } = props;
  const { t } = useTranslation('articles');

  const sortOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
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
  ], [t]);

  return (
    <Select
      onChange={onChange}
      value={sort}
      options={sortOptions}
      label={t('Filter by')}
      className={classNames('', {}, [className])}
    />
  );
});
