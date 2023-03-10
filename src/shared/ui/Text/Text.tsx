import { classNames } from 'shared/config/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextVariants {
  PRIMARY = 'primary',
  ERROR = 'error',
}

interface TextProps {
  className?: string,
  variants?: TextVariants,
  title?: string,
  text?: string,
}

export function Text(props: TextProps) {
  const {
    className,
    variants = TextVariants.PRIMARY,
    text = '',
    title = '',
  } = props;

  return (
    <div className={classNames(cls.Text, { [cls[variants]]: true }, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
}
