import { createContext } from "react";

export enum Theme {
  DARK = 'dark',
  NORMAL = 'normal',
}

export interface ThemeContextProps {
  theme?: Theme,
  setTheme?: (Theme: Theme) => void,
}

export const LS_Theme_KEY = 'theme';
export const ThemeContext = createContext<ThemeContextProps>({});
