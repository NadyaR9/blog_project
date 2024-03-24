import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Sidebar } from './Sidebar';
import { Theme } from '@/shared/const/theme';

export default {
  component: Sidebar,
  title: 'widgets/Sidebar',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
  user: { authData: {} },
})];

export const NoAuthLight = Template.bind({});
NoAuthLight.args = {};
NoAuthLight.decorators = [StoreDecorator({
  user: {},
})];

export const Dark = Template.bind({});
Dark.args = {};

Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  user: { authData: {} },
})];

export const NoAuthDark = Template.bind({});
NoAuthDark.args = {};

NoAuthDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  user: {},
})];
