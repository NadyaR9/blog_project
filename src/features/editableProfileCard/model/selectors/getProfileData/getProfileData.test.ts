import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entites/Country';
import { Currency } from 'entites/Currency';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
  const data = {
    username: 'admin',
    age: 23,
    country: Country.Russia,
    currency: Currency.EUR,
    lastname: 'admin',
    firstname: 'admin',
    city: 'admin',
  };
  test('should return profile data', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
