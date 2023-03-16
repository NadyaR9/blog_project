import { memo } from 'react';
import { classNames, Mods } from 'shared/config/lib/classNames/classNames';
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

interface TextProps {
  className?: string,
  variants?: TextVariants,
  align?: TextAligns,
  title?: string,
  text?: string,
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    variants = TextVariants.PRIMARY,
    text = '',
    title = '',
    align = TextAligns.LEFT,
  } = props;

  const mods: Mods = {
    [cls[variants]]: true,
    [cls[align]]: true,
  };

  return (
    <div className={classNames(cls.Text, mods, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});
