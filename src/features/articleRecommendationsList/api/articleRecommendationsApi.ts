import { rtkApi } from 'shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query({
      query: (limit) => ({
        params: {
          _limit: limit,
        },
        url: '/articles',
      }),
    }),
  }),
  overrideExisting: false,
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;