import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button } from '../../../Button/Button';

export default {
  title: 'shared/Popups/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  items: [
    {
      value: 'first',
      content: <>first</>,
    },
    {
      value: 'second',
      content: <>second</>,
    },
    {
      value: 'third',
      content: <>third</>,
    },
    {
      value: 'link',
      href: 'http://localhost:6006/',
      content: <>link</>,
    },
  ],
  trigger: <Button>Choose</Button>,
  // directions: 'bottom left',
};
