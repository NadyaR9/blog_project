import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
  component: Modal,
  title: 'shared/Modal',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Light = Template.bind({});
Light.args = {
  children: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque eius doloremque illum aspernatur quasi perferendis quaerat, sit maiores nobis ipsum, aliquid beatae at consequatur repellat natus molestias officia ipsa quos?',
  isOpen: true,
};

export const Dark = Template.bind({});
Dark.args = {
  children: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque eius doloremque illum aspernatur quasi perferendis quaerat, sit maiores nobis ipsum, aliquid beatae at consequatur repellat natus molestias officia ipsa quos?',
  isOpen: true,
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
