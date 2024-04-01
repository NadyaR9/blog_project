import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/Card';
import cls from './NotifiactionListItem.module.scss';
import { Notification } from '../../model/types/notification';
import { Text } from '@/shared/ui/Text';

interface NotifiactionListItemProps {
  className?: string;
  item: Notification;
}

export const NotifiactionListItem = memo((props: NotifiactionListItemProps) => {
  const { className, item } = props;

  const content = (
    <Card
      className={classNames(cls.NotificationItem, {}, [className])}
      theme={CardTheme.OUTLINED}
    >
      <Text text={item.description} title={item.title} />
    </Card>
  );
  if (item?.href) {
    return (
      <a target="_blank" href={item.href} rel="noreferrer" className={cls.link}>
        {content}
      </a>
    );
  }
  return content;
});
