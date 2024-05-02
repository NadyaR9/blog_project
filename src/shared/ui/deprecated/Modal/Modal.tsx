import { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Portal } from '../../redesigned/Portal';
import cls from './Modal.module.scss';
import { Overlay } from '../../redesigned/Overlay/Overlay';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

/**
 * @deprecated
 */
export const Modal = (props: ModalProps) => {
  const { className, children, isOpen = false, onClose, lazy } = props;
  const { close, isMounted, isClosing } = useModal({
    animation: ANIMATION_DELAY,
    onClose,
    isOpen,
  });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }
  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};