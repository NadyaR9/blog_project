import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import Logo from '../../../assets/icons/app-image.svg';
import { Icon } from '../Icon';
import { HStack } from '../Stack';

interface AppLogoProps {
  className?: string;
}

/**
 * @deprecated
 */
export const AppLogo = memo((props: AppLogoProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <HStack
      max
      justify="center"
      className={classNames(cls.appLogoWrapper, {}, [className])}
    >
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <Icon Svg={Logo} width={40} height={40}/>
    </HStack>
  );
});
