import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariants = 'outline' | 'clear' | 'filled';
export type ButtonColor = 'success' | 'error' | 'normal';

export type ButtonSize = 's' | 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  className?: string;
  variants?: ButtonVariants;
  size?: ButtonSize;
  square?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    children,
    onClick,
    className,
    variants = 'outline',
    size = 'm',
    square,
    disabled = false,
    addonLeft,
    addonRight,
    color = 'normal',
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(cls.Button, mods, [
        className,
        cls[variants],
        cls[size],
        cls[color],
      ])}
      {...otherProps}
    >
      {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
      {children}
      {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </button>
  );
});
