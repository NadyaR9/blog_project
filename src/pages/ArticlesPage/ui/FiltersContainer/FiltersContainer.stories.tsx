import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticlePageFiltersContainer } from './FiltersContainer';

export default {
  title: 'shared/ArticlePageFiltersContainer',
  component: ArticlePageFiltersContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlePageFiltersContainer>;

const Template: ComponentStory<typeof ArticlePageFiltersContainer> = (args) => (
  <ArticlePageFiltersContainer {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
