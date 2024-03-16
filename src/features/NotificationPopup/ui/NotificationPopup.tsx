import { memo } from 'react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popups';
import { NotificationList } from 'entites/Notification/ui/NotificationList/NotificationList';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { Button, Icon } from 'shared/ui';
import cls from './NotificationPopup.module.scss';

interface NotificationPopupProps {
  className?: string,
}

export const NotificationPopup = memo((props: NotificationPopupProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.NotificationPopup, {}, [className])}>
      <Popover
        className={cls.popover}
        trigger={<Button><Icon Svg={NotificationIcon} /></Button>}
        directions="bottom left"
      >
        <NotificationList className={cls.notifiactionList} />
      </Popover>
    </div>
  );
});
