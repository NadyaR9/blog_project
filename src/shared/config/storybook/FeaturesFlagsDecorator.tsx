import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { FeaturesFlag } from '../types/featuresFlag';

export const FeaturesFlagsDecorator =
  (features: FeaturesFlag) => (StoryComponent: Story) => {
    setFeatureFlags(features);
    return <StoryComponent />;
  };
