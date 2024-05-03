import { ButtonHTMLAttributes, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariants = 'outline' | 'clear' | 'filled';

export type ButtonSize = 's' | 'm' | 'l' | 'xl';

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
    variants = 'outline',
    size = 'm',
    square,
    disabled = false,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(cls.Button, mods, [
        className,
        cls[variants],
        cls[size],
      ])}
      {...otherProps}
    >
      {children}
    </button>
  );
});
