import { classNames } from 'shared/config/lib/classNames';
import { AppLink } from 'shared/ui';
import { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string,
}

export function Navbar({ className }: NavbarProps) {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <AppLink to="/" theme={AppLinkTheme.PRIMARY}>Main</AppLink>
      <AppLink to="/about" theme={AppLinkTheme.SECONDARY}>About</AppLink>
    </div>
  );
}
