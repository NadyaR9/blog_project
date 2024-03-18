import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { User } from '@/entites/User';
import { AvatarDropdown } from './AvatarDropdown';

const authData: User = {
  id: '1',
  username: 'admin',
  avatar: 'https://i.pinimg.com/564x/81/09/1a/81091a8004c62607962adaaea674dc39.jpg',
};

export default {
  title: 'shared/AvatarDropdown',
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({
    user: {
      authData,
    },
  }), (Story) => <div style={{ padding: 100 }}><Story /></div>],
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
