import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from '../../types/profile';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
  test('should return profile validation errors', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.INVALID_AGE,
          ValidateProfileError.NO_DATA,
        ],
      },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([ValidateProfileError.INVALID_AGE,
      ValidateProfileError.NO_DATA]);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
