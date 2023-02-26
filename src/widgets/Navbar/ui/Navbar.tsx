/* eslint-disable max-len */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Modal, Button, ButtonVariants } from 'shared/ui';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string,
}

export function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
  const onToggleModal = () => {
    setIsAuthModal((prev) => !prev);
  };

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        variants={ButtonVariants.SECONDARY}
        onClick={onToggleModal}
      >
        {t('LogIn')}
      </Button>
      <Modal
        isOpen={isAuthModal}
        onClose={() => setIsAuthModal(false)}
      >
        {t('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt tempora repellendus doloremque autem odio id quasi, ut magni minus deleniti culpa omnis provident nostrum quae fuga? Ullam eum dolor aliquam?')}
      </Modal>
    </div>
  );
}
