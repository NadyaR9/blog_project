import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { Select, SelectOption } from '@/shared/ui';
import { SortOrder } from '@/shared/config/types';

interface FiltersProps {
  className?: string,
  order: SortOrder,
  onChange: (order: SortOrder) => void,
}

export const ArticleOrderSelector = memo((props: FiltersProps) => {
  const { className, order, onChange } = props;
  const { t } = useTranslation('articles');

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('asc'),
    },
    {
      value: 'desc',
      content: t('desc'),
    },
  ], [t]);

  return (
    <Select
      value={order}
      onChange={onChange}
      options={orderOptions}
      label={t('Sort label')}
      className={classNames('', {}, [className])}
    />
  );
});
