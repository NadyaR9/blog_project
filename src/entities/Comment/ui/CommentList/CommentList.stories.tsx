import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { CommentList } from './CommentList';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
  <CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  comments: [
    {
      user: { id: '1', username: 'katya' },
      text: 'gggggg',
      id: '44vZodt',
    },
    {
      user: { id: '2', username: 'nadya' },
      text: '12211221',
      id: 'K_t3tY2',
    },
  ],
};
Normal.decorators = [ThemeDecorator(Theme.DARK)];

export const IsLoading = Template.bind({});
IsLoading.args = {
  comments: [],
  isLoading: true,
};
IsLoading.decorators = [ThemeDecorator(Theme.DARK)];
