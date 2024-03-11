import { Country } from 'entites/Country';
import { Currency } from 'entites/Currency';
import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';
import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';

const data = {
  id: '1',
  username: 'admin',
  age: 23,
  country: Country.Russia,
  currency: Currency.EUR,
  lastname: 'admin',
  firstname: 'admin',
  city: 'admin',
};

describe('updateProfileData.test', () => {
  test('success request', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
        isLoading: false,
        readonly: true,
      },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('faild request', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
        isLoading: false,
        readonly: true,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ValidateProfileError.SERVER_ERROR,
    ]);
  });
  test('validation error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...data, lastname: '', firstname: '' },
        isLoading: false,
        readonly: true,
      },
    });

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ValidateProfileError.INVALID_USER_DATA,
    ]);
  });
});
