import { createContext } from 'react';
import { Theme } from '@/shared/const/theme';

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (Theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
