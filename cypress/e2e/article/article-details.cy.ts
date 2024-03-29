let articleId = '';
describe('Visit Artilce Details page', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((data) => {
      cy.log('data', data);
      articleId = data.id;
      cy.visit(`/articles/${articleId}`);
    });
  });
  afterEach(() => {
    cy.deleteArticle(articleId);
  });
  it('Artilce Details Info', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });
  it('Artilce Details Recommendation List', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });
  it('Artilce Details Add new Comment', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddNewCommentForm').scrollIntoView();
    cy.addComment('comment');
    cy.getByTestId('CommentCard').should('have.length', 1);
  });
  it('Artilce Details Rate Article', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(5, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 5);
  });
  it('Artilce Details Rate Article [FIXTURES]', () => {
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(5, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});
