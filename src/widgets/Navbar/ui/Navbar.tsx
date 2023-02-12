import { classNames } from "shared/config/lib/classNames";
import { AppLink, ThemeSwitcher } from "shared/ui";
import { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string,
};

export const Navbar = ({ className }: NavbarProps) => {

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <ThemeSwitcher />
      <AppLink to={'/'} theme={AppLinkTheme.PRIMARY}>Main</AppLink>
      <AppLink to={'/about'} theme={AppLinkTheme.SECONDARY}>About</AppLink>
    </div>
  )
};
