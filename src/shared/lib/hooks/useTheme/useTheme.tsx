import { useContext } from 'react';
import { Theme } from '@/shared/const/theme';
import { ThemeContext, ThemeContextProps } from '../../context/ThemeContext';
import { LS_Theme_KEY } from '@/shared/const/localstorage';

interface useThemeResult {
  theme: Theme;
  toggleTheme: () => void;
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
