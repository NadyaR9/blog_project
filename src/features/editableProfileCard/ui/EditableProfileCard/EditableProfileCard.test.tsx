import { screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { componentRender } from '@/shared/config/tests';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slices/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  id: '1',
  firstname: 'admin',
  lastname: 'admin',
  age: 465,
  currency: Currency.USD,
  country: Country.Kazakhstan,
  city: 'Moscow',
  username: 'admin213',
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: '1' },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('feature/EditableProfileCard', () => {
  test('shift into readonly mode', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
  });
  test('cancel profile edit, return initial value', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    await userEvent.clear(screen.getByTestId('EditableProfileCard.firstname'));
    await userEvent.clear(screen.getByTestId('EditableProfileCard.lastname'));
    await userEvent.type(screen.getByTestId('EditableProfileCard.firstname'), 'name');
    await userEvent.type(screen.getByTestId('EditableProfileCard.lastname'), 'name');
    expect(screen.getByTestId('EditableProfileCard.firstname')).toHaveValue('name');
    expect(screen.getByTestId('EditableProfileCard.lastname')).toHaveValue('name');
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));
    expect(screen.getByTestId('EditableProfileCard.firstname')).toHaveValue('admin');
    expect(screen.getByTestId('EditableProfileCard.lastname')).toHaveValue('admin');
  });
  test('correct form, send put request', async () => {
    const mockPutRequest = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    await userEvent.type(screen.getByTestId('EditableProfileCard.firstname'), 'user');
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
    expect(mockPutRequest).toHaveBeenCalled();
  });
});
