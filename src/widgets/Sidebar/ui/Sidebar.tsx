import { useState } from 'react';
import { classNames } from 'shared/config/lib/classNames';
import { Button, LanguageSwitcher, ThemeSwitcher } from 'shared/ui';
import { VatiantsButton } from 'shared/ui/Button/Button';
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
    <div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsedSidebar }, [className])}>
      <Button
        onClick={toggleSidebar}
        className={cls.toggle}
        variants={VatiantsButton.DEFAULT}
      >
        Toggle
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
