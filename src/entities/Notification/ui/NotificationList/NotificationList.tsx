import { memo } from 'react';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import cls from './NotificationList.module.scss';
import { useNotificationList } from '../../api/notificationApi';
import { NotifiactionListItem } from '../NotifiactionListItem/NotifiactionListItem';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';

interface NotificationListProps {
  className?: string,
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;
  const { data: notifications, isLoading } = useNotificationList(10, {
    pollingInterval: 10000,
  });
  if (isLoading) {
    <VStack>
      <Skeleton width={100} height={50} border="10" />
      <Skeleton width={100} height={50} border="10" />
      <Skeleton width={100} height={50} border="10" />
    </VStack>;
  }
  return (
    <VStack
      className={classNames(cls.NotificationList, {}, [className])}
      gap="8"
      max
    >
      {notifications?.map((notification) => (
        <NotifiactionListItem
          key={notification.id}
          item={notification}
        />
      ))}
    </VStack>
  );
});
