import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { LS_Theme_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const defaultThemeValue = localStorage.getItem(LS_Theme_KEY) as Theme || Theme.LIGHT;

interface ThemeProviderProps {
  initialTheme?: Theme,
}

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { children, initialTheme } = props;
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultThemeValue);

  const defaultValue = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  document.body.className = theme;

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
