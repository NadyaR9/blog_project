import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import ArrowIcon from '@/shared/assets/icons/redesigned/ArrowDown.svg';
import {
  Button,
  ButtonSize,
  ButtonVariants,
} from '@/shared/ui/deprecated/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ToggleFeature } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);
  const toggleSidebar = () => {
    setCollapsedSidebar((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsedSidebar} key={item.path} />
      )),
    [collapsedSidebar, sidebarItemsList],
  );

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <aside
          className={classNames(
            cls.SidebarRedesigned,
            { [cls.collapsedRedesigned]: collapsedSidebar },
            [className],
          )}
          data-testid="sidebar"
        >
          <AppLogo size={collapsedSidebar ? 30 : 50} className={cls.appLogo} />
          <VStack gap="8" className={cls.items} role="navigation">
            {itemsList}
          </VStack>
          <Icon
            onClick={toggleSidebar}
            className={cls.collapsedBtn}
            data-testid="sidebar-toggle"
            Svg={ArrowIcon}
            clickable
          />
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LanguageSwitcher short={collapsedSidebar} />
          </div>
        </aside>
      }
      off={
        <aside
          className={classNames(
            cls.Sidebar,
            { [cls.collapsed]: collapsedSidebar },
            [className],
          )}
          data-testid="sidebar"
        >
          <VStack gap="8" className={cls.items} role="navigation">
            {itemsList}
          </VStack>
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
            <LanguageSwitcher short={collapsedSidebar} />
          </div>
        </aside>
      }
    />
  );
});
