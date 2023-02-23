import { useState } from 'react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Button, LanguageSwitcher, ThemeSwitcher } from 'shared/ui';
import { VariantsButton } from 'shared/ui/Button/Button';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string,
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);

  const toggleSidebar = () => {
    setCollapsedSidebar((prev) => !prev);
  };

  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsedSidebar }, [className])}
      data-testid="sidebar"
    >
      <Button
        onClick={toggleSidebar}
        className={cls.toggle}
        variants={VariantsButton.DEFAULT}
        data-testid="sidebar-toggle"
      >
        +

      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
