import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'normal-border' | 'round' | 'partial';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variants?: CardVariant;
  padding?: CardPadding;
  fullWidth?: boolean;
  border?: CardBorder;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap_0',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
};

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    variants = 'normal',
    fullWidth,
    padding = '8',
    border = 'normal-border',
    ...otherProps
  } = props;

  const paddingClass = mapPaddingToClass[padding];
  return (
    <div
      className={classNames(cls.Card, { [cls.fullWidth]: fullWidth }, [
        className,
        cls[variants],
        cls[paddingClass],
        cls[border],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
