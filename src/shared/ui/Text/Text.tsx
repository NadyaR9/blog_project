import { memo } from 'react';
import { classNames, Mods } from '@/shared/config/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextVariants {
  PRIMARY = 'primary',
  ERROR = 'error',
}

export enum TextAligns {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

interface TextProps {
  className?: string;
  variants?: TextVariants;
  align?: TextAligns;
  title?: string;
  text?: string;
  size?: TextSize;
  'data-testid'?: string;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    variants = TextVariants.PRIMARY,
    text = '',
    title = '',
    align = TextAligns.LEFT,
    size = TextSize.M,
    'data-testid': dataTestId = '',
  } = props;

  const mods: Mods = {
    [cls[variants]]: true,
    [cls[align]]: true,
    [cls[size]]: true,
  };

  const HeaderTag = mapSizeToHeaderTag[size];

  return (
    <div className={classNames(cls.Text, mods, [className])}>
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
