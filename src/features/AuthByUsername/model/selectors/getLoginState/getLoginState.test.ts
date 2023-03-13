import { StateSchema } from 'app/providers/StoreProvider';
import { LoginSchema } from '../../types/LoginSchema';
import { getLoginState } from './getLoginState';

const initialState: LoginSchema = {
  username: '123',
  password: '123',
  isLoading: false,
  error: null,
};

describe('getLoginState.test', () => {
  test('should return state', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: '123',
        password: '123',
        isLoading: false,
        error: null,
      },
    };
    expect(getLoginState(state as StateSchema)).toEqual(initialState);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginState(state as StateSchema)).toEqual(undefined);
  });
});
