import { ReactNode, useMemo, useState } from 'react';
import { LS_Theme_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/config/lib/context/ThemeContext';

const defaultThemeValue =
  (localStorage.getItem(LS_Theme_KEY) as Theme) || Theme.LIGHT;

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, initialTheme } = props;
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultThemeValue);

  const defaultValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  document.body.className = theme;

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
