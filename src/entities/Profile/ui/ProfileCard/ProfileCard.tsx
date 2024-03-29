import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames, Mods } from '@/shared/config/lib/classNames/classNames';
import { Profile } from '../../model/types/profile';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import cls from './ProfileCard.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader';
import { Text, TextAligns, TextVariants } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';

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

export const ProfileCard = memo((props: ProfileCardProps) => {
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
      <HStack justify="center" className={classNames(cls.ProfileCard, {}, [className, cls.isLoading])}>
        <Loader />
      </HStack>
    );
  }
  if (error) {
    return (
      <HStack justify="center" className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          title={t('ProfileErrorTitle')}
          text={t('ProfileErrorDescription')}
          align={TextAligns.CENTER}
          variants={TextVariants.ERROR}
        />
      </HStack>
    );
  }

  return (
    <VStack gap="16" max className={classNames(cls.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <HStack justify="center" max>
          <Avatar
            src={data.avatar}
          />
        </HStack>
      )}
      <Input
        placeholder={t('name')}
        value={data?.firstname}
        onChange={onChangeFirstname}
        readonly={readonly}
        data-testid="EditableProfileCard.firstname"
      />
      <Input
        placeholder={t('surname')}
        value={data?.lastname}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid="EditableProfileCard.lastname"
      />
      <Input
        placeholder={t('age')}
        value={data?.age}
        onChange={onChangeAge}
        readonly={readonly}
        data-testid="EditableProfileCard.age"
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
    </VStack>
  );
});
