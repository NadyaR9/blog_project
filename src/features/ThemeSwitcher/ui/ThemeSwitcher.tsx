import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../shared/ui/Button/Button';
import ThemeDarkIcon from '../assets/theme-dark.svg';
import ThemeLightIcon from '../assets/theme-light.svg';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleTheme = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [toggleTheme, dispatch]);

  return (
    <Button onClick={onToggleTheme} className={classNames('', {}, [className])}>
      {theme === Theme.DARK ? <ThemeDarkIcon /> : <ThemeLightIcon />}
    </Button>
  );
});
