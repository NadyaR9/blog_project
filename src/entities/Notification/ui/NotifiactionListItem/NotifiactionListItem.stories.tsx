import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotifiactionListItem } from './NotifiactionListItem';

export default {
  title: 'entities/Notification/NotifiactionListItem',
  component: NotifiactionListItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotifiactionListItem>;

const Template: ComponentStory<typeof NotifiactionListItem> = (args) => <NotifiactionListItem {...args} />;

export const NormalItem = Template.bind({});
NormalItem.args = {
  item: {
    id: '1',
    title: 'Уведомление 1',
    description: 'Произошло какое-то событие',
    userId: '1',
  },
};

export const LinkItem = Template.bind({});
LinkItem.args = {
  item: {
    id: '2',
    title: 'Уведомление 2',
    description: 'Произошло какое-то событие',
    userId: '1',
    href: 'http://localhost:3000/admin',
  },
};
