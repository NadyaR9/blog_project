import { ArticleDetails, ArticleList } from 'entites/Article';
import { CommentList } from 'entites/Comment';
import { AddNewCommentForm } from 'features/AddNewComment';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/config/lib/components';
import { useAppDispatch } from 'shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/config/lib/hooks/useInitialEffect/useInitialEffect';
import { RoutePath } from 'shared/config/route/routeConfig/routeConfig';
import {
  Button, ButtonVariants, Page, Text, TextSize, VStack,
} from 'shared/ui';
import { getArticleCommentsError, getArticleCommentsIsLoading } from '../model/selectors/comments';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleRecommendationsIsLoading } from '../model/selectors/recommedations';
import {
  getArticleRecommendations,
} from '../model/slices/articleDetailsRecommendationsSlice';
import { fetchArticleRecommendations } from '../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../model/slices';

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleCommentsIsLoading);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
  const error = useSelector(getArticleCommentsError);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  });

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

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
          <Button
            className={cls.backButton}
            variants={ButtonVariants.BACKGROUND_INVERTED}
            onClick={onBackToList}
          >
            {t('Go Back')}
          </Button>
          <VStack gap="16" max>
            <ArticleDetails id={id} />
            <Text size={TextSize.L} title={t('Recommendations Block')} />
            <ArticleList
              articles={recommendations}
              isLoading={recommendationsIsLoading}
              className={cls.recommendations}
              // eslint-disable-next-line i18next/no-literal-string
              target="_blank"
            />
            <Text size={TextSize.L} title={t('Comment Block')} />
            <AddNewCommentForm onSendComment={onSendComment} />
            <CommentList comments={comments} isLoading={isLoading} />
          </VStack>

        </VStack>
      </Page>

    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
