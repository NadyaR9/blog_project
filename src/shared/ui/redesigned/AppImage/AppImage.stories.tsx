import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AppImage } from './AppImage';
import { Skeleton } from '../../deprecated/Skeleton';
import { Icon } from '../../deprecated/Icon';
import DefaultImage from '../../assets/icons/user-filled.svg';

export default {
  title: 'shared/AppImage',
  component: AppImage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AppImage>;

const Template: ComponentStory<typeof AppImage> = (args) => (
  <AppImage {...args} />
);

export const AppImageWithoutError = Template.bind({});
AppImageWithoutError.args = {
  src: 'https://i.pinimg.com/564x/81/09/1a/81091a8004c62607962adaaea674dc39.jpg',
  fallback: <Skeleton height={150} width={150} />,
};

export const AppImageWithError = Template.bind({});
AppImageWithError.args = {
  src: 'https://i.pinimg.com/564x/81/09/1a/81091a8004___07962adaaea674dc39.jpg',
  fallback: <Skeleton height={300} width={300} border="50%" />,
  errorFallback: <Icon Svg={DefaultImage} height={300} width={300} />,
};
