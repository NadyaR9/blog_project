import { createContext } from 'react';

export enum Theme {
  DARK = 'app_dark_theme',
  LIGHT = 'app_light_theme',
}

export interface ThemeContextProps {
  theme?: Theme,
  setTheme?: (Theme: Theme) => void,
}

export const LS_Theme_KEY = 'theme';
export const ThemeContext = createContext<ThemeContextProps>({});
