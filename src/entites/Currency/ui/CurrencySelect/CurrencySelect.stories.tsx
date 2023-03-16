import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CurrencySelect } from './CurrencySelect';
import { Currency } from '../../model/types';

export default {
  component: CurrencySelect,
  title: 'entities/Select',
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => <CurrencySelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: Currency.RUB,
};
