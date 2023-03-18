import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { Country } from 'entites/Country';
import { Currency } from 'entites/Currency';
import ProfilePage from './ProfilePage';

export default {
  component: ProfilePage,
  title: 'pages/ProfilePage',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
  profile: {
    form: {
      username: 'admin',
      age: 23,
      country: Country.Russia,
      currency: Currency.EUR,
      lastname: 'admin',
      firstname: 'admin',
      city: 'admin',
    },
  },
})];

export const Dark = Template.bind({});
Dark.args = {};

Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      username: 'admin',
      age: 23,
      country: Country.Russia,
      currency: Currency.EUR,
      lastname: 'admin',
      firstname: 'admin',
      city: 'admin',
    },
  },
})];
