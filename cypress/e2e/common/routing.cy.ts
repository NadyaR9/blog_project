describe('Routing', () => {
  describe('Common behavior', () => {
    it('Go to Main Page', () => {
      cy.visit('/');
      cy.getByTestId('MainPage').should('exist');
    });
    it('Go to Not Found Page', () => {
      cy.visit('/lkdsjflks');
      cy.getByTestId('NotFoundPage').should('exist');
    });
  });
  describe('User NOT authorized', () => {
    it('Go to Profile Page', () => {
      cy.visit('/profile/1');
      cy.getByTestId('MainPage').should('exist');
    });
  });
  describe('User authorized', () => {
    beforeEach(() => {
      cy.login();
    });
    it('Go to Profile Page', () => {
      cy.visit('/profile/111');
      cy.getByTestId('ProfilePage').should('exist');
    });
    it('Go to Articles Page', () => {
      cy.visit('/articles');
      cy.getByTestId('ArticlesPage').should('exist');
    });
    it('Go to Articles Page', () => {
      cy.visit('/articles/1');
      cy.getByTestId('ArticleDetailsPage').should('exist');
    });
  });
  describe('User authorized and has not admin roles', () => {
    beforeEach(() => {
      cy.login();
    });
    it('Go to Admin Page', () => {
      cy.visit('/admin');
      cy.getByTestId('ForbiddenPage').should('exist');
    });
  });
});
