import { ComponentType } from 'react';
import { useJsonSettings } from '@/entities/User';
import ThemeProvider from './ThemeProvider';

export function withTheme(Component: ComponentType) {
  return () => {
    const { theme: initialTheme } = useJsonSettings();

    return (
      <ThemeProvider initialTheme={initialTheme}>
        <Component />
      </ThemeProvider>
    );
  };
}
