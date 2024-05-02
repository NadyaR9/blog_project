import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AvatarImg from '@/shared/assets/test/user.png';
import { Avatar } from './Avatar';

export default {
  component: Avatar,
  title: 'shared/Avatar',
  args: {
    to: '/',
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src: AvatarImg,
  alt: 'picture',
  size: 150,
};

export const Small = Template.bind({});
Small.args = {
  src: AvatarImg,
  alt: 'picture',
  size: 50,
};
