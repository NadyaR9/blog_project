import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LoginModal } from '@/features/AuthByUsername';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { Button, ButtonVariants } from '@/shared/ui';
import { getUserAuthData } from '@/entites/User';

import { AvatarDropdown } from '@/features/AvatarDropdown/ui/AvatarDropdown';
import { NotificationPopup } from '@/features/NotificationPopup/ui/NotificationPopup';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string,
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation('main');
  const authData = useSelector(getUserAuthData);
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <NotificationPopup />
        <AvatarDropdown />
      </header>
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
