import React, { FC, useMemo, useState } from 'react';
import { LS_Theme_KEY, Theme, ThemeContext } from './ThemeContext';

const defaultThemeValue = localStorage.getItem(LS_Theme_KEY) as Theme || Theme.NORMAL;

const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultThemeValue);

  const defaultValue = useMemo(() => ({
    theme: theme,
    setTheme: setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;