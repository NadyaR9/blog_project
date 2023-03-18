import { Country } from 'entites/Country';
import { Currency } from 'entites/Currency';
import { ValidateProfileError } from '../../types/profile';
import { validateProfileData } from './validateProfileData';

const data = {
  username: 'admin',
  age: 23,
  country: Country.Russia,
  currency: Currency.EUR,
  lastname: 'admin',
  firstname: 'admin',
  city: 'admin',
};

describe('validateProfileData.test', () => {
  test('correct data income', async () => {
    const result = validateProfileData(data);
    expect(result).toEqual([]);
  });

  test('invalid firstname and last name', async () => {
    const result = validateProfileData({ ...data, lastname: '', firstname: '' });
    expect(result).toEqual([ValidateProfileError.INVALID_USER_DATA]);
  });

  test('invalid age', async () => {
    const result = validateProfileData({ ...data, age: undefined });
    expect(result).toEqual([ValidateProfileError.INVALID_AGE]);
  });

  test('invalid country', async () => {
    const result = validateProfileData({ ...data, country: undefined });
    expect(result).toEqual([ValidateProfileError.INVALID_COUNTRY]);
  });

  test('empty data', async () => {
    const result = validateProfileData({});
    expect(result).toEqual([
      ValidateProfileError.INVALID_USER_DATA,
      ValidateProfileError.INVALID_AGE,
      ValidateProfileError.INVALID_COUNTRY,
    ]);
  });
});
