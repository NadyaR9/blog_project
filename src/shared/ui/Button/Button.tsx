import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonVariants {
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'background-inverted',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DISABLED = 'disabled',
}

export enum ButtonSize {
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
}

interface ButtonProps
  extends DetailedHTMLProps
    <ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string,
  variants?: ButtonVariants,
  size?: ButtonSize,
  square?: boolean,
}

export function Button(props: ButtonProps) {
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

  const mods: Record<string, boolean> = {
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
}
