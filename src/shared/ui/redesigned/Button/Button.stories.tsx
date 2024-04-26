import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Button } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
  component: Button,
  title: 'shared/Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline',
  variants: 'outline',
};

export const PrimaryOutlined = Template.bind({});
PrimaryOutlined.args = {
  children: 'Clear',
  variants: 'clear',
};

export const SizeS = Template.bind({});
SizeS.args = {
  children: 'Text',
  variants: 'outline',
  size: 's',
};

export const SizeM = Template.bind({});
SizeM.args = {
  children: 'Text',
  variants: 'outline',
  size: 'm',
};

export const SizeL = Template.bind({});
SizeL.args = {
  children: 'Text',
  variants: 'outline',
  size: 'l',
};

export const SizeXL = Template.bind({});
SizeXL.args = {
  children: 'Text',
  variants: 'outline',
  size: 'xl',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  variants: 'outline',
};

export const DisabledDark = Template.bind({});
DisabledDark.args = {
  children: 'DisabledDark',
  variants: 'outline',
};
DisabledDark.decorators = [ThemeDecorator(Theme.DARK)];
