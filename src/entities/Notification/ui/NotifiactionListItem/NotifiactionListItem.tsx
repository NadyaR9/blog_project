import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from './NotifiactionListItem.module.scss';
import { Notification } from '../../model/types/notification';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeature } from '@/shared/lib/features';

interface NotifiactionListItemProps {
  className?: string;
  item: Notification;
}

export const NotifiactionListItem = memo((props: NotifiactionListItemProps) => {
  const { className, item } = props;

  const content = (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
          <Text text={item.description} title={item.title} />
        </Card>
      }
      off={
        <CardDeprecated
          className={classNames(cls.NotificationItem, {}, [className])}
          theme={CardTheme.OUTLINED}
        >
          <TextDeprecated text={item.description} title={item.title} />
        </CardDeprecated>
      }
    />
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
