import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleOrderSelector } from './ArticleOrderSelector';

export default {
  title: 'features/ArticleOrderSelector',
  component: ArticleOrderSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleOrderSelector>;

const Template: ComponentStory<typeof ArticleOrderSelector> = (args) => (
  <ArticleOrderSelector {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
