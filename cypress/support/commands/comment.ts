export const addComment = (comment: string = 'comment') => {
  cy.getByTestId('AddNewCommentForm.Input').clear().type(comment);
  cy.getByTestId('AddNewCommentForm.AddComment').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      addComment(comment?: string): Chainable<void>
    }
  }
}
