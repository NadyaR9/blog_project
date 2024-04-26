import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/config/types/ui';
import cls from './Popover.module.scss';
import popup from '../../styles/popup.module.scss';
import { mapDirection } from '../../styles/consts';

interface PopoverProps {
  children: ReactNode;
  trigger: ReactNode;
  className: string;
  directions?: DropdownDirection;
}

/**
 * @deprecated
 */
export function Popover(props: PopoverProps) {
  const { children, trigger, className, directions = 'bottom right' } = props;

  const itemsClasses = [mapDirection[directions]];

  return (
    <HPopover className={classNames(cls.Popover, {}, [className, popup.popup])}>
      <HPopover.Button className={popup.trigger}>{trigger}</HPopover.Button>

      <HPopover.Panel
        className={classNames(cls.panel, {}, [popup.items, ...itemsClasses])}
      >
        {children}
      </HPopover.Panel>
    </HPopover>
  );
}
