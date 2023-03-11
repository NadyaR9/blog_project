/* eslint-disable max-len */
import { LoginModal } from 'features/AuthByUsername';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Button, ButtonVariants } from 'shared/ui';
import { getUserAuthData, userActions } from 'entites/User';

import { useDispatch, useSelector } from 'react-redux';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string,
}

export function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);

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
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Button
          variants={ButtonVariants.SECONDARY}
          onClick={onLogout}
        >
          {t('LogOut')}
        </Button>
      </div>
    );
  }
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
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
    </div>
  );
}
