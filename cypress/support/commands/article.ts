import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  id: '111',
  title: 'Default Testing Article',
  subtitle: 'Default Testing Article',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 111,
  createdAt: '11.11.2111',
  userId: '111',
  type: [
    'IT',
  ],
  blocks: [],
};

export const createArticle = (article?: Article) => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:8000/articles',
    headers: {
      Authorization: 'Authorization',
    },
    body: article ?? defaultArticle,
  }).then(({ body }) => body);
};

export const deleteArticle = (articleId: string) => {
  return cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: {
      Authorization: 'Authorization',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>
      deleteArticle(articleId: string): Chainable<void>
    }
  }
}
