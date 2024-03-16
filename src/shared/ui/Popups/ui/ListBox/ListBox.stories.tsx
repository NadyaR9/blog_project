import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
  title: 'shared/Popups/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => <div style={{ padding: 100 }}><Story /></div>,
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const BottomLeft = Template.bind({});
BottomLeft.args = {
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
  ],
  label: 'Choose value',
  directions: 'bottom left',
};
export const TopRight = Template.bind({});
TopRight.args = {
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
  ],
  label: 'Choose value',
  directions: 'top right',
};
export const BottomRight = Template.bind({});
BottomRight.args = {
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
  ],
  label: 'Choose value',
  directions: 'bottom right',
};
export const TopLeft = Template.bind({});
TopLeft.args = {
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
  ],
  label: 'Choose value',
  directions: 'top left',
};
