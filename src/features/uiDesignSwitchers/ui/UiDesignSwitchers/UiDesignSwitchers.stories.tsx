import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UiDesignSwitchers } from './UiDesignSwitchers';

export default {
  title: 'features/UiDesignSwitchers',
  component: UiDesignSwitchers,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UiDesignSwitchers>;

const Template: ComponentStory<typeof UiDesignSwitchers> = (args) => (
  <UiDesignSwitchers {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
