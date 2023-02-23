import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum VariantsButton {
  DEFAULT = 'default',
  OUTLINE = 'outline'
}

interface ButtonProps
  extends DetailedHTMLProps
    <ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string,
  variants?: VariantsButton,
}

export function Button(props: ButtonProps) {
  const {
    children, onClick, className, variants, ...otherProps
  } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(cls.Button, {}, [className, cls[variants]])}
      {...otherProps}
    >
      {children}
    </button>
  );
}
