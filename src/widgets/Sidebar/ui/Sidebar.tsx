import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { RoutePath } from 'shared/config/route/routeConfig/routeConfig';
import {
  AppLink,
  AppLinkTheme,
  Button,
  ButtonSize,
  ButtonVariants,
  LanguageSwitcher,
  ThemeSwitcher,
} from 'shared/ui';
import MainIcon from '../assets/main.svg';
import AboutIcon from '../assets/about.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string,
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const { t } = useTranslation();

  const toggleSidebar = () => {
    setCollapsedSidebar((prev) => !prev);
  };

  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsedSidebar }, [className])}
      data-testid="sidebar"
    >
      <div className={cls.items}>
        <AppLink
          to={RoutePath.main}
          theme={AppLinkTheme.SECONDARY}
          className={cls.item}
        >
          <MainIcon className={cls.icon} />
          <span className={cls.link}>{t('Main')}</span>
        </AppLink>
        <AppLink
          to={RoutePath.about}
          theme={AppLinkTheme.SECONDARY}
          className={cls.item}
        >
          <AboutIcon className={cls.icon} />
          <span className={cls.link}>{t('About')}</span>
        </AppLink>
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
}
