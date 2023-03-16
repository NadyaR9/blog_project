import { ChangeEvent, memo, useMemo } from 'react';
import { classNames, Mods } from 'shared/config/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption {
  value: string,
  content: string,
}

interface AppLinkProps {
  label?: string,
  className?: string,
  options?: SelectOption[],
  value?: string,
  onChange?: (value: string) => void,
  readonly?: boolean,
}

export const Select = memo((props: AppLinkProps) => {
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
    onChange?.(e.target.value);
  };

  return (
    <div
      className={classNames(cls.Wrapper, mods, [className])}
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
    </div>
  );
});
