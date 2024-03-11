import { ArticleDetails } from 'entites/Article';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/config/lib/components';
import { Page, VStack } from 'shared/ui';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducerList: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('articles');
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <Page className={classNames('', {}, [className])}>
        {t('Articles Details Page Not Found')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader removeAfterUnmount reducerList={reducerList}>
      <Page className={classNames('', {}, [className])}>
        <VStack gap="32" max>
          <VStack gap="16" max>
            <ArticleDetailsPageHeader />
            <ArticleDetails id={id} />
            <ArticleRecommendationsList />
            <ArticleDetailsComments id={id} />
          </VStack>
        </VStack>
      </Page>

    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);