import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData, userActions } from '@/entities/User';
import { RoutePath } from '@/shared/const/router';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';

interface AvatarDropdownProps {
  className?: string,
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
    return (
      <Dropdown
        directions="bottom left"
        className={classNames('', {}, [className])}
        trigger={<Avatar size={30} src={authData.avatar} />}
        items={[
          {
            content: t('User Profile'),
            value: 'profile',
            href: RoutePath.profile + authData.id,
          },
          {
            content: t('Log Out'),
            value: 'logout',
            onClick: onLogout,
          },
        ]}
      />

    );
  }
  return null;
});
