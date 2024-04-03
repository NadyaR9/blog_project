import { useContext } from 'react';
import { Theme } from '@/shared/const/theme';
import { ThemeContext, ThemeContextProps } from '../../context/ThemeContext';

interface useThemeResult {
  theme: Theme;
  toggleTheme: (saveAction?: (theme: Theme) => void) => void;
}

export const useTheme = (): useThemeResult => {
  const { theme, setTheme } = useContext<ThemeContextProps>(ThemeContext);

  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
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
    saveAction?.(newtheme);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
};
