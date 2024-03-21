import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RatingCard } from './RatingCard';

export default {
  title: 'entities/Rating',
  component: RatingCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = (args) => <RatingCard {...args} />;

export const Rated = Template.bind({});
Rated.args = {
  rate: 2,
  title: 'Rate article',
};

export const NotRatedWithFeedback = Template.bind({});
NotRatedWithFeedback.args = {
  title: 'Rate article',
  feedbackTitle: 'Rate article',
  hasFeedback: true,
};

export const NotRatedWithoutFeedback = Template.bind({});
NotRatedWithoutFeedback.args = {
  title: 'Rate article',
};
