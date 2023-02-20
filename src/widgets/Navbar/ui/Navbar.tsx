import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { AppLink } from 'shared/ui';
import { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string,
}

export function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <AppLink to="/" theme={AppLinkTheme.PRIMARY}>{t('Main')}</AppLink>
      <AppLink to="/about" theme={AppLinkTheme.SECONDARY}>{t('About')}</AppLink>
    </div>
  );
}
