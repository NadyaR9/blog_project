import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Country } from '../../model/types';
import cls from './CountrySelect.module.scss';
import { ListBox } from '@/shared/ui/deprecated/Popups';

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

  return (
    <ListBox
      label={t('Country')}
      className={classNames(cls.CountrySelect, {}, [className])}
      items={options}
      value={value}
      onChange={onChangaHandler}
      readonly={readonly}
      directions="bottom right"
    />
  );
});
