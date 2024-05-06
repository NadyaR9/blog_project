import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Currency } from '../../model/types';
import cls from './CurrencySelect.module.scss';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ToggleFeature } from '@/shared/lib/features';

interface CurrencyProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: CurrencyProps) => {
  const { t } = useTranslation();
  const { className, value, onChange, readonly } = props;

  const onChangaHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange],
  );

  const listProps = {
    label: t('currency'),
    className: classNames(cls.CurrencySelect, {}, [className]),
    items: options,
    value,
    onChange: onChangaHandler,
    readonly,
    directions: 'top right' as const,
  };

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={<ListBox {...listProps} />}
      off={<ListBoxDeprecated {...listProps} />}
    />
  );
});
