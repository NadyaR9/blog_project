import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { AppLink } from './AppLink';
import { Theme } from '@/shared/const/theme';

export default {
  component: AppLink,
  title: 'shared/AppLink',
  args: {
    to: '/',
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
  <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  variant: 'primary',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Primary',
  variant: 'primary',
};

PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Red = Template.bind({});
Red.args = {
  children: 'Red',
  variant: 'red',
};
