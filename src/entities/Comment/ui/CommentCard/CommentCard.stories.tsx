import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { CommentCard } from './CommentCard';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comment: {
    user: { id: '1', username: 'katya' },
    text: 'gggggg',
    id: '44vZodt',
  },
};
Normal.decorators = [ThemeDecorator(Theme.DARK)];

export const IsLoading = Template.bind({});
IsLoading.args = {
  isLoading: true,
};
IsLoading.decorators = [ThemeDecorator(Theme.DARK)];
