import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import AddNewCommentForm from './AddNewCommentForm';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'features/AddNewCommentForm',
  component: AddNewCommentForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AddNewCommentForm>;

const Template: ComponentStory<typeof AddNewCommentForm> = (args) => (
  <AddNewCommentForm {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  onSendComment: action('onSendComment'),
};

Normal.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
