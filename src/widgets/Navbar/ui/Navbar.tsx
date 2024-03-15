import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import {
  Avatar, Button, ButtonVariants, Dropdown,
} from 'shared/ui';
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entites/User';

import { useDispatch, useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/route/routeConfig/routeConfig';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string,
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation('main');
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logoutUser());
  }, [dispatch]);

  if (authData) {
    return (
      <Dropdown
        directions="bottom left"
        className={cls.Navbar}
        trigger={<Avatar size={30} src={authData.avatar} />}
        items={[
          ...(isAdmin || isManager ? [{
            content: t('Admin'),
            value: 'admin',
            href: RoutePath.admin,
          }] : []),
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
  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        variants={ButtonVariants.SECONDARY}
        onClick={onOpenModal}
      >
        {t('LogIn')}
      </Button>
      {isAuthModal && (
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      )}
    </header>
  );
});
