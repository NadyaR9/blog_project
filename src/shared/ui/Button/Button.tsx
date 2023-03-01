import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonVariants {
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'background-inverted',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
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
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [cls.square]: square,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(cls.Button, mods, [className, cls[variants], cls[size]])}
      {...otherProps}
    >
      {children}
    </button>
  );
}
