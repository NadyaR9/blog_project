import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from './Flex';

export default {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
  children: (
    <>
      <div>Text</div>
      <div>Text</div>
      <div>Text</div>
      <div>Text</div>
    </>
  ),
};

export const Column = Template.bind({});
Column.args = {
  direction: 'column',
  children: (
    <>
      <div>Text</div>
      <div>Text</div>
      <div>Text</div>
      <div>Text</div>
    </>
  ),
};

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
  gap: '16',
  direction: 'column',
  children: (
    <>
      <div>Text</div>
      <div>Text</div>
      <div>Text</div>
      <div>Text</div>
    </>
  ),
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
  gap: '16',
  direction: 'row',
  children: (
    <>
      <div>Text</div>
      <div>Text</div>
      <div>Text</div>
      <div>Text</div>
    </>
  ),
};
