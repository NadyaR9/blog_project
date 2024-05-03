import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/config/types/ui';
import { Button } from '../../../Button';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';

import { mapDirection } from '../../styles/consts';
import { HStack } from '../../../../redesigned/Stack';

interface ListBoxItems<T extends string> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  className?: string;
  value?: T;
  onChange: (value: T) => void;
  items: ListBoxItems<T>[];
  defaultValue?: string;
  readonly?: boolean;
  label?: string;
  directions?: DropdownDirection;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const { t } = useTranslation();
  const {
    className = '',
    value,
    defaultValue = t('Choose the value'),
    items,
    readonly = false,
    onChange,
    label,
    directions = 'top right',
  } = props;

  const optionsClasses = [mapDirection[directions], popupCls.menu];

  const selectedItem = useMemo(() => {
    return items.find((item) => item.value === value);
  }, [items, value]);

  return (
    <HStack gap="8">
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <HListBox
        as="div"
        value={value}
        onChange={onChange}
        disabled={readonly}
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
      >
        <HListBox.Button className={popupCls.trigger}>
          <Button
            disabled={readonly}
            variants="filled"
            size="s"
            className={cls.button}
          >
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.option, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                    [popupCls.selected]: selected,
                  })}
                >
                  {selected && '>'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}
