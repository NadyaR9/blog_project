import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button, VariantsButton } from './Button';

export default {
  component: Button,
  title: 'shared/Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
  variants: VariantsButton.DEFAULT,
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline',
  variants: VariantsButton.OUTLINE,
};

export const Error = Template.bind({});
Error.args = {
  children: 'Error',
  variants: VariantsButton.DEFAULT,
};
