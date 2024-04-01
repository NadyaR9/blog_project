import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { Button, ButtonSize, ButtonVariants } from '@/shared/ui/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';

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
  );
});
