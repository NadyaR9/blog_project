import { Story } from '@storybook/react';
// eslint-disable-next-line eslint-check-relative-path/layers-import
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <ThemeProvider initialTheme={theme}>
    <StoryComponent />
  </ThemeProvider>
);
