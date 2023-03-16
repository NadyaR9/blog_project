import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/config/lib/classNames/classNames';
import {
  TextAligns, Input, Loader, Text, TextVariants, Avatar,
} from 'shared/ui';
import { Profile } from 'entites/Profile';
import { Currency, CurrencySelect } from 'entites/Currency';
import { Country, CountrySelect } from 'entites/Country';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string,
  data?: Profile,
  isLoading?: boolean,
  error?: string,
  readonly?: boolean,
  onChangeFirstname?: (value?: string) => void,
  onChangeLastname?: (value?: string) => void,
  onChangeAge?: (value?: string) => void,
  onChangeCity?: (value?: string) => void,
  onChangeUsername?: (value?: string) => void,
  onChangeAvatar?: (value?: string) => void,
  onChangeCurrency?: (currency: Currency) => void,
  onChangeCountry?: (country: Country) => void,
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { t } = useTranslation('profile');
  const {
    className,
    data,
    isLoading,
    error,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCurrency,
    onChangeCountry,
  } = props;

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.isLoading])}>
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          title={t('ProfileErrorTitle')}
          text={t('ProfileErrorDescription')}
          align={TextAligns.CENTER}
          variants={TextVariants.ERROR}
        />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar
              src={data.avatar}
            />
          </div>
        )}
        <Input
          placeholder={t('name')}
          value={data?.first}
          onChange={onChangeFirstname}
          readonly={readonly}
        />
        <Input
          placeholder={t('surname')}
          value={data?.lastname}
          onChange={onChangeLastname}
          readonly={readonly}
        />
        <Input
          placeholder={t('age')}
          value={data?.age}
          onChange={onChangeAge}
          readonly={readonly}
        />
        <Input
          placeholder={t('city')}
          value={data?.city}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          placeholder={t('username')}
          value={data?.username}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <Input
          placeholder={t('avatar')}
          value={data?.avatar}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <CurrencySelect
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <CountrySelect
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  );
};
