import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from '@/entites/Country';
import { Currency } from '@/entites/Currency';
import AvatarImg from '@/shared/assets/test/user.png';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: 'admin',
    age: 23,
    country: Country.Russia,
    currency: Currency.EUR,
    lastname: 'admin',
    firstname: 'admin',
    city: 'admin',
    avatar: AvatarImg,
  },
};

export const withError = Template.bind({});
withError.args = {
  error: 'error',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
