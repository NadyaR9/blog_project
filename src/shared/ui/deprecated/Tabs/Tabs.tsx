import { ReactNode, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

/**
 * @deprecated
 */
export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value: currentValue, onTabClick } = props;

  const clickHandler = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          onClick={clickHandler(tab)}
          className={cls.tab}
          theme={
            tab.value === currentValue ? CardTheme.OUTLINED : CardTheme.NORMAL
          }
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
