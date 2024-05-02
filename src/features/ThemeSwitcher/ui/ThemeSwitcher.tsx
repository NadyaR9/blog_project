import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated } from '../../../shared/ui/deprecated/Button/Button';
import ThemeIconDeprecated from '../assets/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/redesigned/ThemeSwitch.svg';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ToggleFeature } from '@/shared/lib/features';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleTheme = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [toggleTheme, dispatch]);

  return (
    <ToggleFeature
      name="isAppRedesigned"
      off={
        <ButtonDeprecated
          onClick={onToggleTheme}
          className={classNames('', {}, [className])}
        >
          <IconDeprecated
            Svg={ThemeIconDeprecated}
            width={40}
            height={40}
            inverted
          />
        </ButtonDeprecated>
      }
      on={
        <Icon
          Svg={ThemeIcon}
          width={40}
          height={40}
          clickable
          onClick={onToggleTheme}
          className={classNames('', {}, [className])}
        />
      }
    />
  );
});
