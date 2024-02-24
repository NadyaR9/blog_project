import { ArticleDetails } from 'entites/Article';
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
  Button, ButtonVariants, Page, Text,
} from 'shared/ui';
import { getArticleCommentsError, getArticleCommentsIsLoading } from '../model/selectors/comments';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments } from '../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducerList: ReducerList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('articles');
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleCommentsIsLoading);
  const error = useSelector(getArticleCommentsError);
  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Articles Details Page Not Found')}
      </Page>
    );
  }
  return (
    <DynamicModuleLoader removeAfterUnmount reducerList={reducerList}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Button
          className={cls.backButton}
          variants={ButtonVariants.BACKGROUND_INVERTED}
          onClick={onBackToList}
        >
          {t('Go Back')}
        </Button>
        <ArticleDetails id={id} />
        <Text title={t('Comment Block')} />
        <AddNewCommentForm onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isLoading} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
