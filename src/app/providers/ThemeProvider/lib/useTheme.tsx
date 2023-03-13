import { useContext, useEffect } from 'react';
import {
  LS_Theme_KEY, Theme, ThemeContext, ThemeContextProps,
} from './ThemeContext';

interface useThemeResult {
  theme: Theme,
  toggleTheme: () => void,
}

export const useTheme = (): useThemeResult => {
  const { theme, setTheme } = useContext<ThemeContextProps>(ThemeContext);

  const toggleTheme = () => {
    const newtheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme?.(newtheme);
    document.body.className = newtheme;
    localStorage.setItem(LS_Theme_KEY, newtheme);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
};
