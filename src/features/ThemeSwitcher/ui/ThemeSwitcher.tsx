import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../shared/ui/Button/Button';
import ThemeDarkIcon from '../assets/theme-dark.svg';
import ThemeLightIcon from '../assets/theme-light.svg';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button onClick={toggleTheme} className={classNames('', {}, [className])}>
      {theme === Theme.DARK ? <ThemeDarkIcon /> : <ThemeLightIcon />}
    </Button>
  );
});
