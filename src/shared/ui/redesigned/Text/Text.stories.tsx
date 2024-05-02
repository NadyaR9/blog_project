import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Text } from './Text';
import { Theme } from '@/shared/const/theme';

export default {
  component: Text,
  title: 'shared/Text',
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Title = Template.bind({});
Title.args = {
  title: 'Title',
};

export const SizeS = Template.bind({});
SizeS.args = {
  title: 'Title',
  text: 'Text',
  size: 's',
};

export const SizeM = Template.bind({});
SizeM.args = {
  title: 'Title',
  text: 'Text',
  size: 'm',
};

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Title',
  text: 'Text',
  size: 'l',
};

export const TextProps = Template.bind({});
TextProps.args = {
  text: 'Text',
};

export const TextTitle = Template.bind({});
TextTitle.args = {
  title: 'title',
  text: 'text',
};

export const Error = Template.bind({});
Error.args = {
  title: 'title',
  text: 'text',
  variants: 'error',
};

export const TextTitleDark = Template.bind({});
TextTitleDark.args = {
  title: 'title',
  text: 'text',
};
TextTitleDark.decorators = [ThemeDecorator(Theme.DARK)];
