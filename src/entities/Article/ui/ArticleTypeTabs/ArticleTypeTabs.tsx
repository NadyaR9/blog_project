import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { ArticleTypes } from '../../model/consts/consts';
import cls from './ArticleTypeTabs.module.scss';
import { TabItem, Tabs } from '@/shared/ui/Tabs';

interface ArticleTypeTabsProps {
  className?: string,
  onChange: (tab: ArticleTypes) => void;
  value: ArticleTypes,
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, onChange, value } = props;
  const { t } = useTranslation('articles');

  const typeTabs = useMemo<TabItem[]>(() => [
    {
      value: ArticleTypes.ALL,
      content: t('all'),
    },
    {
      value: ArticleTypes.ECONOMICS,
      content: t('economics'),
    },
    {
      value: ArticleTypes.IT,
      content: t('IT'),
    },
    {
      value: ArticleTypes.SCIENCE,
      content: t('science'),
    },
  ], [t]);

  const onTabChange = useCallback((tab: TabItem) => {
    onChange(tab.value as ArticleTypes);
  }, [onChange]);

  return (
    <Tabs
      className={classNames(cls.ArticleTypeTabs, {}, [className])}
      tabs={typeTabs}
      value={value}
      onTabClick={onTabChange}
    />
  );
});
