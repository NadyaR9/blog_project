import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '../../../Text/Text';
import { Popover } from './Popover';
import { Button } from '../../../Button/Button';

export default {
  title: 'shared/Popups/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  children: (
    <>
      <Text text="first" />
      <Text text="second" />
      <Text text="third" />
    </>
  ),
  trigger: <Button>Choose</Button>,
  directions: 'bottom left',
};
