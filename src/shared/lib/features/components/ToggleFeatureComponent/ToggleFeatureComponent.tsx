import { ReactElement } from 'react';
import { FeaturesFlag } from '@/shared/config/types/featuresFlag';
import { getFeatureFlag } from '../../lib/setGetFeaturesFlag';

interface ToggleFeatureComponentOptions {
  on: ReactElement;
  off: ReactElement;
  name: keyof FeaturesFlag;
}

export function ToggleFeature({
  on,
  off,
  name,
}: ToggleFeatureComponentOptions) {
  if (getFeatureFlag(name)) {
    return on;
  }
  return off;
}
