import { useTranslation } from 'react-i18next';

import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAddArticleRate, useGetArticleRate } from '../../api/articleRate';
import { getUserAuthData } from '@/entities/User';
import { RatingCard } from '@/entities/Rating';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export interface ArticleRateProps {
  className?: string;
  articleId: string;
}

const ArticleRate = memo((props: ArticleRateProps) => {
  const { className, articleId } = props;
  const authData = useSelector(getUserAuthData);
  const { t } = useTranslation('articles');

  const { data: ratingData, isLoading } = useGetArticleRate({
    articleId,
    userId: authData?.id ?? '',
  });
  const [rateArticleMutation] = useAddArticleRate();

  const onHandleRating = useCallback(
    (rate: number, feedback?: string) => {
      try {
        rateArticleMutation({
          rate,
          feedback,
          articleId,
          userId: authData?.id ?? '',
        });
      } catch (error) {
        console.log(error);
      }
    },
    [rateArticleMutation, authData, articleId],
  );

  const onAccept = useCallback(
    (rate: number, feedback?: string) => {
      onHandleRating(rate, feedback);
    },
    [onHandleRating],
  );

  const onCancel = useCallback(
    (rate: number) => {
      onHandleRating(rate);
    },
    [onHandleRating],
  );

  if (isLoading) {
    return <Skeleton width="100%" height={100} />;
  }

  const rating = ratingData?.[0];

  return (
    <RatingCard
      hasFeedback
      feedbackTitle={t('Leave comment')}
      title={t('Rate article')}
      rate={rating?.rate}
      onAccept={onAccept}
      onCancel={onCancel}
      className={className}
    />
  );
});

export default ArticleRate;
