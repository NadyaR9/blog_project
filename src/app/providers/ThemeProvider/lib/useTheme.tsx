import { useContext } from "react";
import { LS_Theme_KEY, Theme, ThemeContext, ThemeContextProps } from "./ThemeContext";

interface useThemeResult {
  theme: Theme,
  toggleTheme: () => void,
}

export const useTheme = (): useThemeResult => {
  const {theme, setTheme} = useContext<ThemeContextProps>(ThemeContext);

  const toggleTheme = () => {
    const newtheme = theme === Theme.DARK ? Theme.NORMAL : Theme.DARK;
    setTheme(newtheme);
    localStorage.setItem(LS_Theme_KEY, newtheme);
  };

  return {
    theme, toggleTheme
  };
};
