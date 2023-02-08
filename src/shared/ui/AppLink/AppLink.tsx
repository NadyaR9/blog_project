import { Link, LinkProps } from "react-router-dom";
import { classNames } from "shared/config/lib/classNames";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  theme?: AppLinkTheme,
}

export const AppLink = (props: AppLinkProps) => {
  const {
    children,
    to,
    className,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props;

  return (
    <Link {...otherProps} to={to} className={classNames(cls.AppLink, {}, [className, cls[theme]])}>
      {children}
    </Link>
  )
};