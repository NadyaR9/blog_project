import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  inverted?: boolean;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

/**
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
  const { className, Svg, inverted, ...otherProps } = props;

  return (
    <Svg
      className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
        className,
      ])}
      {...otherProps}
    />
  );
});
