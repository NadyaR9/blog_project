import { useTheme, Theme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Button } from 'shared/ui';
import ThemeDarkIcon from './assets/theme-dark.svg';
import ThemeLightIcon from './assets/theme-light.svg';

interface ThemeSwitcherProps {
  className?: string,
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      onClick={toggleTheme}
      className={classNames('', {}, [className])}
    >
      {theme === Theme.DARK ? <ThemeDarkIcon /> : <ThemeLightIcon />}
    </Button>
  );
}
