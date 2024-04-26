import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/config/types/ui';
import cls from './Dropdown.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { AppLink } from '../../../AppLink';
import { mapDirection } from '../../styles/consts';

interface DropdownItemsProps {
  value: string;
  content?: ReactNode;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface DropdownProps {
  items: DropdownItemsProps[];
  trigger: ReactNode;
  className: string;
  directions?: DropdownDirection;
}

/**
 * @deprecated
 */
export function Dropdown(props: DropdownProps) {
  const { items, trigger, className, directions = 'bottom right' } = props;
  const itemsClasses = [mapDirection[directions]];

  return (
    <Menu
      as="div"
      className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
    >
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.items, {}, itemsClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              className={classNames(cls.item, {
                [popupCls.active]: active,
                [popupCls.disabled]: item.disabled,
              })}
              onClick={item.onClick}
            >
              {item.content}
            </button>
          );
          if (item.href) {
            return (
              <Menu.Item
                as={AppLink}
                to={item.href}
                key={item.value}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );
          }
          return (
            <Menu.Item as={Fragment} key={item.value} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
