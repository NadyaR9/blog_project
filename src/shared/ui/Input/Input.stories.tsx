import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Input } from './Input';

export default {
  component: Input,
  title: 'shared/Input',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Light = Template.bind({});
Light.args = {
  placeholder: 'Type text',
};

export const Dark = Template.bind({});
Dark.args = {
  placeholder: 'Type text',
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
