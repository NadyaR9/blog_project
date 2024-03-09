import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonSize, ButtonVariants } from '../Button/Button';
import cls from './ListBox.module.scss';
import { HStack } from '../Stack/HStack/HStack';

type DropdownDirection = 'top' | 'bottom';

interface ListBoxItems {
  value: string,
  content: ReactNode,
  disabled?: boolean,
}

interface ListBoxProps {
  className?: string,
  value?: string,
  defaultValue?: string,
  items: ListBoxItems[],
  readonly?: boolean,
  onChange: (value: string) => void;
  label: string,
  directions?: DropdownDirection
}

const mapDirection: Record<DropdownDirection, string> = {
  bottom: cls.optionsBottom,
  top: cls.optionsTop,
};

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
    directions = 'bottom',
  } = props;

  const optionsClasses = [mapDirection[directions]];

  return (
    <HStack gap="8">
      {label && (
        <span className={cls.label}>
          {`${label}>`}
        </span>
      )}
      <HListBox
        as="div"
        value={value}
        onChange={onChange}
        disabled={readonly}
        className={classNames(cls.ListBox, {}, [className])}
      >
        <HListBox.Button className={cls.trigger}>
          <Button
            disabled={readonly}
            variants={ButtonVariants.OUTLINE}
            size={ButtonSize.S}
            className={cls.button}
          >
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
          {items.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.option, { [cls.active]: active, [cls.disabled]: item.disabled })}
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
