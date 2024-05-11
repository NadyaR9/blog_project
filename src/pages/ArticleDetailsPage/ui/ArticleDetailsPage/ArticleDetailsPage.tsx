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
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';
import { ToggleFeature } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';

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

  return (
    <DynamicModuleLoader removeAfterUnmount reducerList={reducerList}>
      <ToggleFeature
        name="isAppRedesigned"
        on={
          <StickyContentLayout
            content={
              <Page
                className={classNames('', {}, [className])}
                data-testid="ArticleDetailsPage"
              >
                <VStack gap="32" max>
                  <VStack gap="16" max>
                    <DetailsContainer />
                    <ArticleRate articleId={id} />
                    {/* <ArticleRecommendationsList /> */}
                    <ArticleDetailsComments id={id} />
                  </VStack>
                </VStack>
              </Page>
            }
            right={<AdditionalInfoContainer />}
          />
        }
        off={
          <Page
            className={classNames('', {}, [className])}
            data-testid="ArticleDetailsPage"
          >
            <VStack gap="32" max>
              <VStack gap="16" max>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                {/* {articleRating} */}
                <ToggleFeature
                  name="starRatingFeature"
                  on={<ArticleRate articleId={id} />}
                  off={<Card>{t('Soon, it will be rate')}</Card>}
                />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id} />
              </VStack>
            </VStack>
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
