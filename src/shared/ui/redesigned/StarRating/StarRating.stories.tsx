import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StarRating } from './StarRating';

export default {
  title: 'shared/StarRating',
  component: StarRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => (
  <StarRating {...args} />
);

export const SelectedStar = Template.bind({});
SelectedStar.args = {
  selectedStar: 2,
  size: 30,
};

export const NotSelectedStar = Template.bind({});
NotSelectedStar.args = {
  size: 30,
};
