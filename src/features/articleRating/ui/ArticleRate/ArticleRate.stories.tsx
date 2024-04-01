import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import ArticleRate from './ArticleRate';
import { PostArticleArgs } from '../../api/articleRate';

export default {
  title: 'features/ArticleRate',
  component: ArticleRate,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator({
      user: { authData: { id: '1' } },
    }),
  ],
} as ComponentMeta<typeof ArticleRate>;

const getSavedRate: PostArticleArgs = {
  rate: 4,
  feedback: 'Хорошая статья',
  userId: '1',
  articleId: '1',
};

const Template: ComponentStory<typeof ArticleRate> = (args) => (
  <ArticleRate {...args} />
);

export const GetArticleRate = Template.bind({});
GetArticleRate.parameters = {
  mockData: [
    {
      url: `${__API__}/article-ratings?articleId=1&userId=1`,
      method: 'GET',
      status: 200,
      response: [getSavedRate],
    },
  ],
};
