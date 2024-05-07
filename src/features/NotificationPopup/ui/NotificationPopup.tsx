import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover } from '@/shared/ui/redesigned/Popups';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { NotificationList } from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/notification.svg';
import NotificationIcon from '@/shared/assets/icons/redesigned/Notifications.svg';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import cls from './NotificationPopup.module.scss';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ToggleFeature } from '@/shared/lib/features';

interface NotificationPopupProps {
  className?: string;
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

  const trigger = (
    <ToggleFeature
      name="isAppRedesigned"
      on={<Icon Svg={NotificationIcon} clickable onClick={onDrawerOpen} />}
      off={
        <ButtonDeprecated onClick={onDrawerOpen}>
          <IconDeprecated Svg={NotificationIconDeprecated} />
        </ButtonDeprecated>
      }
    />
  );

  return (
    <div className={classNames(cls.NotificationPopup, {}, [className])}>
      <BrowserView>
        <ToggleFeature
          name="isAppRedesigned"
          on={
            <Popover
              className={cls.popover}
              trigger={trigger}
              directions="bottom left"
            >
              <NotificationList className={cls.notifications} />
            </Popover>
          }
          off={
            <PopoverDeprecated
              className={cls.popover}
              trigger={trigger}
              directions="bottom left"
            >
              <NotificationList className={cls.notifications} />
            </PopoverDeprecated>
          }
        />
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
