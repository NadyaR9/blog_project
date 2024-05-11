import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLink as AppLinkRedesigned } from '@/shared/ui/redesigned/AppLink';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar as AvatarRedesigned } from '@/shared/ui/redesigned/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { ToggleFeature, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;
  if (isLoading) {
    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });
    return (
      <VStack
        max
        gap="8"
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
      >
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
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <Card padding="24" border="round" fullWidth>
          <VStack
            max
            gap="8"
            className={classNames(cls.CommentCardRedesigned, {}, [className])}
            data-testid="CommentCard"
          >
            <AppLinkRedesigned
              className={cls.header}
              to={getRouteProfile(comment?.user.id)}
            >
              {comment?.user.avatar && (
                <AvatarRedesigned size={30} src={comment?.user.avatar} />
              )}
              <TextRedesigned title={comment?.user.username} />
            </AppLinkRedesigned>
            <TextRedesigned text={comment?.text} className={cls.text} />
          </VStack>
        </Card>
      }
      off={
        <VStack
          max
          gap="8"
          className={classNames(cls.CommentCard, {}, [className])}
          data-testid="CommentCard"
        >
          <AppLinkDeprecated
            className={cls.header}
            to={getRouteProfile(comment?.user.id)}
          >
            {comment?.user.avatar && (
              <AvatarDeprecated size={30} src={comment?.user.avatar} />
            )}
            <TextDeprecated title={comment?.user.username} />
          </AppLinkDeprecated>
          <TextDeprecated text={comment?.text} className={cls.text} />
        </VStack>
      }
    />
  );
});
