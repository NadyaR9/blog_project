import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { RouteDecorator } from '../../src/shared/config/storybook/RouteDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator';
import { Theme } from '../../src/shared/const/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  themes: {
    default: 'dark',
    list: [
      { name: 'dark', class: Theme.DARK, color: '#0f1048' },
      { name: 'light', class: Theme.LIGHT, color: '#fbf4fb' },
      { name: 'blue', class: Theme.BLUE, color: '#008972' },
    ],
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouteDecorator);
addDecorator(SuspenseDecorator);
