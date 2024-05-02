import { memo } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  variant?: AppLinkVariant;
  activeClassname?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    children,
    to,
    className,
    variant = 'primary',
    activeClassname = '',
    ...otherProps
  } = props;
  return (
    <NavLink
      {...otherProps}
      to={to}
      className={({ isActive }) =>
        classNames(cls.AppLink, { [activeClassname]: isActive }, [
          className,
          cls[variant],
        ])
      }
    >
      {children}
    </NavLink>
  );
});
