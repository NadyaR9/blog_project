import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LoginModal } from '@/features/AuthByUsername';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';

import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationPopup } from '@/features/NotificationPopup';
import cls from './Navbar.module.scss';
import {
  Button as ButtonDeprecated,
  ButtonVariants,
} from '@/shared/ui/deprecated/Button';
import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { ToggleFeature } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface NavbarProps {
  className?: string;
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
      <ToggleFeature
        name="isAppRedesigned"
        on={
          <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
            <HStack gap="16" className={cls.actions}>
              <NotificationPopup />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(cls.Navbar, {}, [className])}>
            <HStack gap="16" className={cls.actions}>
              <NotificationPopup />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    );
  }
  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <ToggleFeature
        name="isAppRedesigned"
        on={
          <ButtonRedesigned variants="clear" onClick={onOpenModal}>
            {t('LogIn')}
          </ButtonRedesigned>
        }
        off={
          <ButtonDeprecated
            variants={ButtonVariants.SECONDARY}
            onClick={onOpenModal}
          >
            {t('LogIn')}
          </ButtonDeprecated>
        }
      />
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
