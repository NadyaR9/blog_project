import { DeepPartial } from 'redux';
import { LoginSchema } from '../types/LoginSchema';
import { LoginActions, LoginReducer } from './loginSlice';

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: '123' };
    expect(LoginReducer(state as LoginSchema, LoginActions.setUsername('123'))).toEqual({ username: '123' });
  });
  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' };
    expect(LoginReducer(state as LoginSchema, LoginActions.setPassword('123'))).toEqual({ password: '123' });
  });
});
