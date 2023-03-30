import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/config/lib/classNames/classNames';
import {
  Button,
  ButtonSize,
  ButtonVariants,
  LanguageSwitcher,
  ThemeSwitcher,
} from 'shared/ui';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string,
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);
  const toggleSidebar = () => {
    setCollapsedSidebar((prev) => !prev);
  };

  const itemsList = useMemo(() => sidebarItemsList.map((item) => (
    <SidebarItem
      item={item}
      collapsed={collapsedSidebar}
      key={item.path}
    />
  )), [collapsedSidebar, sidebarItemsList]);

  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsedSidebar }, [className])}
      data-testid="sidebar"
    >
      <div className={cls.items}>
        {itemsList}
      </div>
      <Button
        onClick={toggleSidebar}
        className={cls.collapsedBtn}
        variants={ButtonVariants.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
        data-testid="sidebar-toggle"
      >
        {collapsedSidebar ? '>' : '<'}
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher
          short={collapsedSidebar}
        />
      </div>
    </div>
  );
});
