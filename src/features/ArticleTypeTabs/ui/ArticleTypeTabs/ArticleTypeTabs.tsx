import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTypeTabs.module.scss';
import { Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { TabItem, Tabs } from '@/shared/ui/redesigned/Tabs';
import { ArticleTypes } from '@/entities/Article';
import { ToggleFeature } from '@/shared/lib/features';

interface ArticleTypeTabsProps {
  className?: string;
  onChange: (tab: ArticleTypes) => void;
  value: ArticleTypes;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, onChange, value } = props;
  const { t } = useTranslation('articles');

  const typeTabs = useMemo<TabItem[]>(
    () => [
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
    ],
    [t],
  );

  const onTabChange = useCallback(
    (tab: TabItem) => {
      onChange(tab.value as ArticleTypes);
    },
    [onChange],
  );

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <Tabs
          className={classNames(cls.ArticleTypeTabs, {}, [className])}
          tabs={typeTabs}
          value={value}
          onTabClick={onTabChange}
          direction="column"
        />
      }
      off={
        <TabsDeprecated
          className={classNames(cls.ArticleTypeTabs, {}, [className])}
          tabs={typeTabs}
          value={value}
          onTabClick={onTabChange}
        />
      }
    />
  );
});
