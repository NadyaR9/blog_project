import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { RouteName, RoutePath } from 'shared/config/route/routeConfig/routeConfig';
import {
  AppLink,
  Avatar, Icon, Skeleton, Text,
} from 'shared/ui';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

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
      <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={100} height={16} />
        </div>
        <Skeleton height={30} className={cls.text} />
      </div>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink className={cls.header} to={`${RoutePath.profile}${comment?.user.id}`}>
        {comment?.user.avatar && <Avatar size={30} src={comment?.user.avatar} />}
        <Text
          title={comment?.user.username}
        />
      </AppLink>
      <Text
        text={comment?.text}
        className={cls.text}
      />
    </div>
  );
});
