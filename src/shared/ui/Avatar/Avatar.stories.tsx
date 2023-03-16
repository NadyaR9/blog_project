import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar } from './Avatar';
import AvatarImg from './user.png';

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
