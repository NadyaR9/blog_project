import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { DropdownDirection } from 'shared/config/types/ui';
import cls from './Popover.module.scss';
import popup from '../../styles/popup.module.scss';
import { mapDirection } from '../../styles/consts';

interface PopoverProps {
  children: ReactNode,
  trigger: ReactNode,
  className: string,
  directions?: DropdownDirection,
}

export function Popover(props: PopoverProps) {
  const {
    children, trigger, className, directions = 'bottom right',
  } = props;

  const itemsClasses = [mapDirection[directions]];

  return (
    <HPopover className={classNames(cls.Popover, {}, [className, popup.popup])}>
      <HPopover.Button
        className={classNames(cls.trigger, {}, [popup.trigger])}
      >
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(cls.items, {}, [popup.items, ...itemsClasses])}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
}
