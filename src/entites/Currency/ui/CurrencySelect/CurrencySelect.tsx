import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Select } from 'shared/ui';
import { Currency } from '../../model/types';
import cls from './CurrencySelect.module.scss';

interface CurrencyProps {
  className?: string,
  value?: Currency,
  onChange?: (value: Currency) => void,
  readonly?: boolean,
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: CurrencyProps) => {
  const { t } = useTranslation();
  const {
    className, value, onChange, readonly,
  } = props;

  const onChangaHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <Select
      label={t('currency')}
      className={classNames(cls.CurrencySelect, {}, [className])}
      options={options}
      value={value}
      onChange={onChangaHandler}
      readonly={readonly}
    />
  );
});
