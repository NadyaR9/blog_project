import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData, userActions } from '@/entities/User';
import { getRouteProfile, getRouteSettings } from '@/shared/const/router';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { ToggleFeature } from '@/shared/lib/features';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(userActions.logoutUser());
  }, [dispatch]);

  if (authData) {
    const items = [
      {
        content: t('User Profile'),
        value: 'profile',
        href: getRouteProfile(authData.id),
      },
      {
        content: t('Settings'),
        value: 'profile',
        href: getRouteSettings(),
      },
      {
        content: t('Log Out'),
        value: 'logout',
        onClick: onLogout,
      },
    ];
    return (
      <ToggleFeature
        name="isAppRedesigned"
        on={
          <Dropdown
            directions="bottom left"
            className={classNames('', {}, [className])}
            trigger={<Avatar size={40} src={authData.avatar} />}
            items={items}
          />
        }
        off={
          <DropdownDeprecated
            directions="bottom left"
            className={classNames('', {}, [className])}
            trigger={<AvatarDeprecated size={30} src={authData.avatar} />}
            items={items}
          />
        }
      />
    );
  }
  return null;
});
