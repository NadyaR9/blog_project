import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface CommentListProps {
  className?: string,
  comments?: Comment[],
  isLoading?: boolean,
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation('comments');

  if (isLoading) {
    return (
      <VStack max gap="16" className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack max gap="16" className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => <CommentCard key={comment.id} comment={comment} isLoading={isLoading} />)
      ) : (
        <Text text={t('Comments not found')} />
      )}
    </VStack>
  );
});
