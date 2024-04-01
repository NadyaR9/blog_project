import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

export interface GetArticleArgs {
  userId: string;
  articleId: string;
}

export interface PostArticleArgs extends Rating {
  userId: string;
  articleId: string;
}

const articleRateApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRateApi: build.query<Rating[], GetArticleArgs>({
      query: ({ userId, articleId }: GetArticleArgs) => ({
        params: {
          userId,
          articleId,
        },
        url: '/article-ratings',
      }),
    }),
    addArticleRateApi: build.mutation<void, PostArticleArgs>({
      query: (arg: PostArticleArgs) => ({
        body: arg,
        method: 'POST',
        url: '/article-ratings',
      }),
    }),
  }),
  overrideExisting: false,
});

export const useGetArticleRate = articleRateApi.useGetArticleRateApiQuery;
export const useAddArticleRate = articleRateApi.useAddArticleRateApiMutation;
