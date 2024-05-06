import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Country } from '../../model/types';
import cls from './CountrySelect.module.scss';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ToggleFeature } from '@/shared/lib/features';

interface CountryProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo((props: CountryProps) => {
  const { t } = useTranslation();
  const { className, value, onChange, readonly } = props;

  const onChangaHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange],
  );

  const listProps = {
    label: t('currency'),
    className: classNames(cls.CountrySelect, {}, [className]),
    items: options,
    value,
    onChange: onChangaHandler,
    readonly,
    directions: 'bottom right' as const,
  };

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={<ListBox {...listProps} />}
      off={<ListBoxDeprecated {...listProps} />}
    />
  );
});
