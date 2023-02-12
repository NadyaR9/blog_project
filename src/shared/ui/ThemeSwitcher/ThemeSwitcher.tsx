import { useTheme, Theme } from "app/providers/ThemeProvider";
import { classNames } from "shared/config/lib/classNames";
import { Button } from "shared/ui";
import ThemeDarkIcon from './assets/theme-dark.svg';
import ThemeLightIcon from './assets/theme-light.svg';
import cls from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
  className?: string,
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      onClick={toggleTheme}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
    >
      {theme === Theme.DARK && <ThemeDarkIcon />}
      {theme === Theme.NORMAL && <ThemeLightIcon />}
    </Button>
  )
};