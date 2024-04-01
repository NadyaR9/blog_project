import { selectByTestId } from '../../helpers/helpers';
import { User } from '../../../src/entities/User';
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';

export const login = (
  username: string = 'testing',
  password: string = '123',
) => {
  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:8000/login',
      body: {
        username,
        password,
      },
    })
    .then(({ body }) => {
      window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
      return body;
    });
};

export const getByTestId = (testid: string) => {
  return cy.get(selectByTestId(testid));
};

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<User>;
      getByTestId(testid: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
