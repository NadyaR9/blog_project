import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { AppLink, AppLinkTheme } from './AppLink';

export default {
  component: AppLink,
  title: 'shared/AppLink',
  args: {
    to: '/',
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  theme: AppLinkTheme.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  theme: AppLinkTheme.SECONDARY,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Primary',
  theme: AppLinkTheme.PRIMARY,
};

PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  children: 'Secondary',
  theme: AppLinkTheme.SECONDARY,
};

SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Red = Template.bind({});
Red.args = {
  children: 'Red',
  theme: AppLinkTheme.RED,
};
