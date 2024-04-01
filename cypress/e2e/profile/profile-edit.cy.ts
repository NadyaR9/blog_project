let profileId = '';
describe('Edit Profile', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      profileId = data.id;
      cy.log('profileId', profileId);
      cy.visit(`/profile/${profileId}`);
    });
    cy.getByTestId('ProfilePage').should('exist');
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('Succes loading profile', () => {
    cy.getByTestId('EditableProfileCard.firstname').should('exist');
  });
  it('Edit profile card', () => {
    const newFirstName = 'firstname';
    const newLastname = 'lastname';
    cy.editProfile(newFirstName, newLastname);
    cy.getByTestId('EditableProfileCard.firstname').should(
      'have.value',
      newFirstName,
    );
    cy.getByTestId('EditableProfileCard.lastname').should(
      'have.value',
      newLastname,
    );
  });
});
