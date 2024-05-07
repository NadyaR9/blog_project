import { FeaturesFlag } from '@/shared/config/types/featuresFlag';
import { getFeatureFlag } from './setGetFeaturesFlag';

interface ToggleFeaturesOptions<T> {
  on: () => T;
  off: () => T;
  name: keyof FeaturesFlag;
}

export function toggleFeatures<T>({ on, off, name }: ToggleFeaturesOptions<T>) {
  if (getFeatureFlag(name)) {
    return on();
  }
  return off();
}
