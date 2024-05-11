import { useTranslation } from 'react-i18next';

import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleList } from '@/entities/Article';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeature } from '@/shared/lib/features';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;

    const { t } = useTranslation('articles');

    const {
      data: articles,
      isLoading,
      error,
    } = useArticleRecommendationsList(3);

    if (error || !articles?.length) {
      return null;
    }

    if (isLoading) {
      return (
        <ToggleFeature
          name="isAppRedesigned"
          on={<SkeletonRedesigned height={100} />}
          off={<SkeletonDeprecated height={100} />}
        />
      );
    }

    return (
      <VStack
        gap="8"
        className={classNames('', {}, [className])}
        data-testid="ArticleRecommendationsList"
      >
        <ToggleFeature
          name="isAppRedesigned"
          on={<Text size="l" title={t('Recommendations Block')} />}
          off={
            <TextDeprecated
              size={TextSize.L}
              title={t('Recommendations Block')}
            />
          }
        />
        <ArticleList articles={articles} target="_blank" />
      </VStack>
    );
  },
);
