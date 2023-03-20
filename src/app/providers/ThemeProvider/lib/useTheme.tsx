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
    let newtheme: Theme;
    switch (theme) {
    case Theme.DARK:
      newtheme = Theme.LIGHT;
      break;
    case Theme.LIGHT:
      newtheme = Theme.BLUE;
      break;
    case Theme.BLUE:
      newtheme = Theme.DARK;
      break;
    default:
      newtheme = Theme.DARK;
      break;
    }
    setTheme?.(newtheme);
    document.body.className = newtheme;
    localStorage.setItem(LS_Theme_KEY, newtheme);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
};
