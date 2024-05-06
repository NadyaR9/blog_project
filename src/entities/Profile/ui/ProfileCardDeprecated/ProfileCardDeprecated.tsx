import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Loader as LoaderDeprecated } from '@/shared/ui/deprecated/Loader';

import { Input as InputDerecated } from '@/shared/ui/deprecated/Input';
import {
  Text as TextDeprecated,
  TextAligns,
  TextVariants,
} from '@/shared/ui/deprecated/Text';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';

export const ProfileCardErrorDeprecated = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack
      justify="center"
      className={classNames(cls.ProfileCard, {}, [cls.error])}
    >
      <TextDeprecated
        title={t('ProfileErrorTitle')}
        text={t('ProfileErrorDescription')}
        align={TextAligns.CENTER}
        variants={TextVariants.ERROR}
      />
    </HStack>
  );
};

export const ProfileCardLoaderDeprecated = () => {
  return (
    <HStack
      justify="center"
      className={classNames(cls.ProfileCard, {}, [cls.isLoading])}
    >
      <LoaderDeprecated />
    </HStack>
  );
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
  const { t } = useTranslation('profile');
  const {
    className,
    data,
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

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" max>
          <Avatar src={data.avatar} />
        </HStack>
      )}
      <InputDerecated
        placeholder={t('name')}
        value={data?.firstname}
        onChange={onChangeFirstname}
        readonly={readonly}
        data-testid="EditableProfileCard.firstname"
      />
      <InputDerecated
        placeholder={t('surname')}
        value={data?.lastname}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid="EditableProfileCard.lastname"
      />
      <InputDerecated
        placeholder={t('age')}
        value={data?.age}
        onChange={onChangeAge}
        readonly={readonly}
        data-testid="EditableProfileCard.age"
      />
      <InputDerecated
        placeholder={t('city')}
        value={data?.city}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <InputDerecated
        placeholder={t('username')}
        value={data?.username}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <InputDerecated
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
    </VStack>
  );
});
