import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariants = 'primary' | 'error' | 'accent';

export type TextAligns = 'center' | 'left' | 'right';

export type TextSize = 's' | 'm' | 'l';

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

const mapSizeToClass: Record<TextSize, string> = {
  s: cls.size_s,
  m: cls.size_m,
  l: cls.size_l,
};

interface TextProps {
  className?: string;
  variants?: TextVariants;
  align?: TextAligns;
  title?: string;
  text?: string;
  size?: TextSize;
  bold?: boolean;
  'data-testid'?: string;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    variants = 'primary',
    text = '',
    title = '',
    align = 'left',
    size = 'm',
    bold,
    'data-testid': dataTestId = '',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];
  const sizeClass = mapSizeToClass[size];

  const additionalClasses = [className, cls[variants], cls[align], sizeClass];

  return (
    <div
      className={classNames(cls.Text, { [cls.bold]: bold }, additionalClasses)}
    >
      {title && (
        <HeaderTag className={cls.title} data-testid={`${dataTestId}.Header`}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
          {text}
        </p>
      )}
    </div>
  );
});
