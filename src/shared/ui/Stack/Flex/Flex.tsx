import { DetailedHTMLProps, HTMLAttributes, ReactNode, memo } from 'react';
import { Mods, classNames } from 'shared/config/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'between' | 'center' | 'end' | 'start';
export type FlexAlign = 'center' | 'start' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  32: cls.gap32,
};

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  end: cls.justifyEnd,
  center: cls.justifyCenter,
  between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  end: cls.alignEnd,
  start: cls.alignStart,
  center: cls.alignCenter,
};

const directionClasses: Record<FlexDirection, string> = {
  column: cls.directionColumn,
  row: cls.directionRow,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export interface FlexProps extends DivProps {
  className?: string,
  children: ReactNode,
  justify?: FlexJustify,
  align?: FlexAlign,
  direction?: FlexDirection,
  gap?: FlexGap,
  max?: boolean,
}

export const Flex = memo((props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    max,
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
  ];

  const mods: Mods = {
    [cls.max]: max,
  };

  return (
    <div className={classNames(cls.Flex, mods, classes)}>
      {children}
    </div>
  );
});
