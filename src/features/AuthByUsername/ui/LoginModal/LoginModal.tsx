import { Suspense } from 'react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Loader, Modal } from 'shared/ui';
import { LoginFormAsync } from '../LoginForm/LoginFormAsync';
import cls from './LoginModal.module.scss';

interface LoginModalProps {
  className?: string,
  isOpen: boolean,
  onClose: () => void,
}

export const LoginModal = (props: LoginModalProps) => {
  const { className, isOpen, onClose } = props;
  return (
    <Modal
      className={classNames(cls.LoginModal, {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
