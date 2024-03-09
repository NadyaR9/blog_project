import { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from 'shared/config/lib/classNames/classNames';
import cls from './Select.module.scss';
import { HStack } from '../Stack/HStack/HStack';

export interface SelectOption<T extends string> {
  value: T,
  content: string,
}

interface SelectProps<T extends string> {
  label?: string,
  className?: string,
  options?: SelectOption<T>[],
  value?: T,
  onChange?: (value: T) => void,
  readonly?: boolean,
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    label,
    className,
    options,
    value,
    onChange,
    readonly,
  } = props;
  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  const optionsList = useMemo(() => options?.map(({ value, content }) => (
    <option
      className={cls.option}
      value={value}
      key={value}
    >
      {content}
    </option>
  )), [options]);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  return (
    <HStack
      className={classNames('', mods, [className])}
    >
      {label && (
        <span className={cls.label}>
          {`${label}>`}
        </span>
      )}
      <select
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionsList}
      </select>
    </HStack>
  );
};
