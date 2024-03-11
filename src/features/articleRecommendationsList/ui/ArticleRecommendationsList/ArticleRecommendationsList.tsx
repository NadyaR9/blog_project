import { classNames } from 'shared/config/lib/classNames/classNames';

import { useTranslation } from 'react-i18next';

import { memo } from 'react';
import {
  Skeleton, Text, TextSize, VStack,
} from 'shared/ui';
import { ArticleList } from 'entites/Article';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;

  const { t } = useTranslation('articles');

  const { data: articles, isLoading, error } = useArticleRecommendationsList(3);

  if (error) {
    return null;
  }

  if (isLoading) {
    return <Skeleton height={100} />;
  }

  return (
    <VStack gap="8" className={classNames('', {}, [className])}>
      <Text size={TextSize.L} title={t('Recommendations Block')} />
      <ArticleList
        articles={articles}
        target="_blank"
      />
    </VStack>
  );
});
