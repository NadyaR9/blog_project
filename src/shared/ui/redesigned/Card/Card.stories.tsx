import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Text } from '../Text/Text';
import { Card } from './Card';
import { Theme } from '@/shared/const/theme';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator';

export default {
  title: 'shared/redesigned/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

const children = <Text title="Title" text="Text" />;
export const Normal = Template.bind({});
Normal.args = {
  children,
};
Normal.decorators = [NewDesignDecorator];

export const Dark = Template.bind({});
Dark.args = {
  children,
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Blue = Template.bind({});
Blue.args = {
  children,
};

Blue.decorators = [ThemeDecorator(Theme.BLUE)];
