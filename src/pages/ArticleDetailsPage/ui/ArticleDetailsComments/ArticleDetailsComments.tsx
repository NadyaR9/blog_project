import { Suspense, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AddNewCommentForm } from '@/features/AddNewComment';
import { CommentList } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Loader as LoaderDeprecated } from '@/shared/ui/deprecated/Loader';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeature } from '@/shared/lib/features';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo(
  (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation('articles');
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);

    useInitialEffect(() => {
      if (id) {
        dispatch(fetchCommentsByArticleId(id));
      }
    });

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text));
      },
      [dispatch],
    );

    return (
      <VStack max gap="8" className={classNames('', {}, [className])}>
        <ToggleFeature
          name="isAppRedesigned"
          on={<Text size="l" title={t('Comment Block')} />}
          off={<TextDeprecated size={TextSize.L} title={t('Comment Block')} />}
        />
        <Suspense
          fallback={
            <ToggleFeature
              name="isAppRedesigned"
              on={<Skeleton width="100%" />}
              off={<LoaderDeprecated />}
            />
          }
        >
          <AddNewCommentForm onSendComment={onSendComment} />
        </Suspense>
        <CommentList comments={comments} isLoading={isLoading} />
      </VStack>
    );
  },
);
