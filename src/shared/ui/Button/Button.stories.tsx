import React from 'react';
import { Theme } from 'app/providers/ThemeProvider';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Button, ButtonSize, ButtonVariants } from './Button';

export default {
  component: Button,
  title: 'shared/Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline',
  variants: ButtonVariants.OUTLINE,
};

export const Background = Template.bind({});
Background.args = {
  children: 'Background',
  variants: ButtonVariants.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
  children: 'BackgroundInverted',
  variants: ButtonVariants.BACKGROUND_INVERTED,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  variants: ButtonVariants.SECONDARY,
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  variants: ButtonVariants.PRIMARY,
};

export const SecondaryOutlined = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  variants: ButtonVariants.SECONDARY_OUTLINED,
};

export const PrimaryOutlined = Template.bind({});
Primary.args = {
  children: 'Primary',
  variants: ButtonVariants.PRIMARY_OUTLINED,
};

export const SquareM = Template.bind({});
SquareM.args = {
  children: '>',
  variants: ButtonVariants.BACKGROUND_INVERTED,
  size: ButtonSize.M,
  square: true,
};

export const SquareL = Template.bind({});
SquareL.args = {
  children: '>',
  variants: ButtonVariants.BACKGROUND_INVERTED,
  size: ButtonSize.L,
  square: true,
};

export const SquareXL = Template.bind({});
SquareXL.args = {
  children: '>',
  variants: ButtonVariants.BACKGROUND_INVERTED,
  size: ButtonSize.XL,
  square: true,
};

export const SizeM = Template.bind({});
SizeM.args = {
  children: 'Text',
  variants: ButtonVariants.OUTLINE,
  size: ButtonSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
  children: 'Text',
  variants: ButtonVariants.OUTLINE,
  size: ButtonSize.L,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
  children: 'Text',
  variants: ButtonVariants.OUTLINE,
  size: ButtonSize.XL,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  variants: ButtonVariants.OUTLINE,
};

export const DisabledDark = Template.bind({});
DisabledDark.args = {
  children: 'DisabledDark',
  variants: ButtonVariants.OUTLINE,
};
DisabledDark.decorators = [ThemeDecorator(Theme.DARK)];
