import { Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LoginFormAsync } from '../LoginForm/LoginFormAsync';
import cls from './LoginModal.module.scss';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Loader } from '@/shared/ui/deprecated/Loader';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
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
