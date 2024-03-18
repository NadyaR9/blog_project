import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Skeleton } from './Skeleton';

export default {
  title: 'shared/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  width: '100%',
  height: 150,
};

export const NormalCircle = Template.bind({});
NormalCircle.args = {
  width: 150,
  height: 150,
  border: '50%',
};

export const Dark = Template.bind({});
Dark.args = {
  width: '100%',
  height: 150,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkCircle = Template.bind({});
DarkCircle.args = {
  width: 150,
  height: 150,
  border: '50%',
};
DarkCircle.decorators = [ThemeDecorator(Theme.DARK)];

export const Blue = Template.bind({});
Blue.args = {
  width: '100%',
  height: 150,
};
Blue.decorators = [ThemeDecorator(Theme.BLUE)];

export const BlueCircle = Template.bind({});
BlueCircle.args = {
  width: 150,
  height: 150,
  border: '50%',
};
BlueCircle.decorators = [ThemeDecorator(Theme.BLUE)];
