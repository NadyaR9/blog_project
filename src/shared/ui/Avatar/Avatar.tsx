import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from 'shared/config/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string,
  src?: string,
  size?: number,
  alt?: string,
}

export const Avatar = (props: AvatarProps) => {
  const {
    className, src, size, alt,
  } = props;
  const mods: Mods = {

  };

  const styles = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size]);

  return (
    <img
      src={src}
      style={styles}
      alt={alt}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};
