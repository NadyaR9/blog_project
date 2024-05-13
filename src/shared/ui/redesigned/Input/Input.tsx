import {
  InputHTMLAttributes,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  memo,
  ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { HStack } from '../Stack';
import { Text } from '../Text';

type DefaultInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends DefaultInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  label?: string;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly = false,
    addonLeft,
    addonRight,
    label,
    ...other
  } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      inputRef.current?.focus();
    }
  }, [autofocus]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.focus]: isFocused,
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight),
  };

  const input = (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
      <input
        placeholder={placeholder}
        className={cls.input}
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlur}
        onFocus={onFocus}
        readOnly={readonly}
        {...other}
      />
      {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </div>
  );

  if (label) {
    return (
      <HStack max gap="8">
        <Text text={`${label}:`} />
        {input}
      </HStack>
    );
  }
  return input;
});
