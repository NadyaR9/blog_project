import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from './Select';

export default {
  component: Select,
  title: 'shared/Select',
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Select test',
  options: [
    { value: '1', content: 'content 1' },
    { value: '2', content: 'content 2' },
    { value: '3', content: 'content 3' },
  ],
};
