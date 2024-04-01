import { ButtonHTMLAttributes, memo } from 'react';
import { classNames, Mods } from '@/shared/config/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonVariants {
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'background-inverted',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  PRIMARY_OUTLINED = 'primary-outlined',
  SECONDARY_OUTLINED = 'secondary-outlined',
  DISABLED = 'disabled',
}

export enum ButtonSize {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variants?: ButtonVariants;
  size?: ButtonSize;
  square?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const {
    children,
    onClick,
    className,
    variants = ButtonVariants.BACKGROUND,
    size = ButtonSize.M,
    square,
    disabled = false,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls[variants]]: true,
    [cls[size]]: true,
    [cls.disabled]: disabled,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(cls.Button, mods, [className])}
      {...otherProps}
    >
      {children}
    </button>
  );
});
