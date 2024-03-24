import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import ProfilePage from './ProfilePage';
import { Theme } from '@/shared/const/theme';

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

export const Blue = Template.bind({});
Blue.args = {};

Blue.decorators = [ThemeDecorator(Theme.BLUE), StoreDecorator({
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
