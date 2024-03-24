import { Story } from '@storybook/react';
// eslint-disable-next-line eslint-check-relative-path/layers-import
import '@/app/styles/index.scss';

export const StyleDecorator = (story: () => Story) => story();
