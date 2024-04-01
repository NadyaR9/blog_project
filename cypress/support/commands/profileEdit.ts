import { Profile } from '../../../src/entities/Profile';

export const editProfile = (
  firstname: string = 'firstname',
  lastname: string = 'lastname',
) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('EditableProfileCard.firstname').clear().type(firstname);
  cy.getByTestId('EditableProfileCard.lastname').clear().type(lastname);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: {
      Authorization: 'Authorization',
    },
    body: {
      id: '111',
      firstname: 'Testing',
      lastname: 'Testing',
      age: 24,
      currency: 'EUR',
      country: 'Kazakhstan',
      city: 'Belgorod still',
      username: 'testing',
      avatar:
        'https://i.pinimg.com/564x/81/09/1a/81091a8004c62607962adaaea674dc39.jpg',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      editProfile(firstname?: string, lastname?: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<Profile>;
    }
  }
}
