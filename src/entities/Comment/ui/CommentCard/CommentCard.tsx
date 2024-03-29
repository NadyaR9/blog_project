import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';

interface CommentCardProps {
  className?: string,
  comment?: Comment,
  isLoading?: boolean,
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <VStack max gap="8" className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <HStack gap="16">
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={100} height={16} />
        </HStack>
        <Skeleton height={30} className={cls.text} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack max gap="8" className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink className={cls.header} to={getRouteProfile(comment?.user.id)}>
        {comment?.user.avatar && <Avatar size={30} src={comment?.user.avatar} />}
        <Text
          title={comment?.user.username}
        />
      </AppLink>
      <Text
        text={comment?.text}
        className={cls.text}
      />
    </VStack>
  );
});
