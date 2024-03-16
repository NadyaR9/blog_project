import { ReactNode, memo } from 'react';
import { Mods, classNames } from 'shared/config/lib/classNames/classNames';
import { useModal } from 'shared/config/lib/hooks/useModal/useModal';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './Drawer.module.scss';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

interface DrawerProps {
  className?: string,
  children: ReactNode,
  isOpen: boolean,
  onClose: () => void,
  lazy: boolean,
}

const ANIMATION_DELAY = 300;

export const Drawer = memo((props: DrawerProps) => {
  const {
    className, children, isOpen, onClose, lazy,
  } = props;
  const { theme } = useTheme();
  const { close, isMounted, isClosing } = useModal({
    animation: ANIMATION_DELAY,
    onClose,
    isOpen,
  });

  if (lazy && !isMounted) {
    return null;
  }

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={close} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
});
