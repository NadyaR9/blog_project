import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationList.module.scss';
import { useNotificationList } from '../../api/notificationApi';
import { NotifiactionListItem } from '../NotifiactionListItem/NotifiactionListItem';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;
  const { data: notifications, isLoading } = useNotificationList(10, {
    pollingInterval: 10000,
  });
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  if (isLoading) {
    return (
      <VStack
        className={classNames(cls.NotificationList, {}, [className])}
        gap="8"
        max
      >
        <Skeleton width="100%" height={64} border="10" />
        <Skeleton width="100%" height={64} border="10" />
        <Skeleton width="100%" height={64} border="10" />
      </VStack>
    );
  }
  return (
    <VStack
      className={classNames(cls.NotificationList, {}, [className])}
      gap="8"
      max
    >
      {notifications?.map((notification) => (
        <NotifiactionListItem key={notification.id} item={notification} />
      ))}
    </VStack>
  );
});
