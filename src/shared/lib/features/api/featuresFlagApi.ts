import { rtkApi } from '@/shared/api/rtkApi';
import { FeaturesFlag } from '@/shared/config/types/featuresFlag';

interface updateFeatureFlagsOptions {
  userId: string;
  features: Partial<FeaturesFlag>;
}
const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateFeaturesFlags: build.mutation<void, updateFeatureFlagsOptions>({
      query: ({ features, userId }: updateFeatureFlagsOptions) => ({
        body: { features },
        method: 'PATCH',
        url: `/users/${userId}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const updateFeaturesFlagsMutation =
  featureFlagsApi.endpoints.updateFeaturesFlags.initiate;
