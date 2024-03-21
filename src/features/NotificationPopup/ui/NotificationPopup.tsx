import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { Popover } from '@/shared/ui/Popups';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Button, Icon } from '@/shared/ui';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import cls from './NotificationPopup.module.scss';

interface NotificationPopupProps {
  className?: string,
}

export const NotificationPopup = memo((props: NotificationPopupProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onDrawerOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onDrawerClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const trigger = (<Button onClick={onDrawerOpen}><Icon Svg={NotificationIcon} /></Button>);

  return (
    <div className={classNames(cls.NotificationPopup, {}, [className])}>
      <BrowserView>
        <Popover
          className={cls.popover}
          trigger={trigger}
          directions="bottom left"
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onDrawerClose} lazy>
          <NotificationList className={cls.notificationsDrawer} />
        </Drawer>
      </MobileView>
    </div>
  );
});
