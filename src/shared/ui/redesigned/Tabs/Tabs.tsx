import { ReactNode, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
  const {
    className,
    tabs,
    value: currentValue,
    onTabClick,
    direction = 'row',
  } = props;

  const clickHandler = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex
      gap="8"
      align="start"
      direction={direction}
      className={classNames(cls.Tabs, {}, [className])}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === currentValue;
        return (
          <Card
            key={tab.value}
            onClick={clickHandler(tab)}
            className={classNames(cls.tab, {
              [cls.selected]: isSelected,
            })}
            variants={isSelected ? 'light' : 'normal'}
            border="round"
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});
