import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import { ArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema';

export interface ArticlesDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema;
  recommedations: ArticleDetailsRecommendationsSchema;
}
