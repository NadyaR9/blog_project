import { FeaturesFlag } from '@/shared/config/types/featuresFlag';
import { LS_LAST_DESIGN_KEY } from '@/shared/const/localstorage';

const defaultFeaturesFlag: FeaturesFlag = {
  isAppRedesigned: localStorage.getItem(LS_LAST_DESIGN_KEY) === 'new',
};
let featuresFlag: FeaturesFlag = {
  ...defaultFeaturesFlag,
};

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
