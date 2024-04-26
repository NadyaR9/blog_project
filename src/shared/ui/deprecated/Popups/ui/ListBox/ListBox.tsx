import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/config/types/ui';
import { Button, ButtonSize, ButtonVariants } from '../../../Button';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { HStack } from '../../../Stack/HStack/HStack';
import { mapDirection } from '../../styles/consts';

interface ListBoxItems {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  className?: string;
  value?: string;
  defaultValue?: string;
  items: ListBoxItems[];
  readonly?: boolean;
  onChange: (value: string) => void;
  label: string;
  directions?: DropdownDirection;
}

/**
 * @deprecated
 */
export function ListBox(props: ListBoxProps) {
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

  const optionsClasses = [mapDirection[directions]];

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
            variants={ButtonVariants.OUTLINE}
            size={ButtonSize.S}
            className={cls.button}
          >
            {value ?? defaultValue}
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
