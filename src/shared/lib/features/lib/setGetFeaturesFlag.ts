import { FeaturesFlag } from '@/shared/config/types/featuresFlag';

let featuresFlag: FeaturesFlag;

export function setFeatureFlags(newFeatureFlags?: FeaturesFlag) {
  if (newFeatureFlags) {
    featuresFlag = newFeatureFlags;
  }
}

export function getFeatureFlag(name: keyof FeaturesFlag) {
  return featuresFlag?.[name];
}

export function getAllFeatureFlags() {
  return featuresFlag;
}
