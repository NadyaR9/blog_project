import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { LS_Theme_KEY } from '@/shared/const/localstorage';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const fallbackTheme = localStorage.getItem(LS_Theme_KEY) as Theme;

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, initialTheme } = props;
  const [isThemeInited, setThemeInited] = useState(false);

  const [theme, setTheme] = useState<Theme>(
    initialTheme || fallbackTheme || Theme.DARK,
  );

  useEffect(() => {
    if (!isThemeInited && initialTheme) {
      setTheme(initialTheme);
      setThemeInited(true);
    }
  }, [initialTheme, isThemeInited]);

  const defaultValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem(LS_Theme_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
