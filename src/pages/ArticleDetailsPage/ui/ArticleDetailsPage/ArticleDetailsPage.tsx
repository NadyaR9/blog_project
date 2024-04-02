/* eslint-disable react/no-unstable-nested-components */
import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleRate } from '@/features/articleRating';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/Card';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducerList: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  const articleRating = toggleFeatures({
    name: 'starRatingFeature',
    on: () => <ArticleRate articleId={id} />,
    off: () => <Card>{t('Soon, it will be rate')}</Card>,
  });

  return (
    <DynamicModuleLoader removeAfterUnmount reducerList={reducerList}>
      <Page
        className={classNames('', {}, [className])}
        data-testid="ArticleDetailsPage"
      >
        <VStack gap="32" max>
          <VStack gap="16" max>
            <ArticleDetailsPageHeader />
            <ArticleDetails id={id} />
            {articleRating}
            <ArticleRecommendationsList />
            <ArticleDetailsComments id={id} />
          </VStack>
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
