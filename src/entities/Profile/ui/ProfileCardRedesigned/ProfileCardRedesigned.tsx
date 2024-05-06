import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const ProfileCardErrorRedesigned = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack justify="center">
      <Text
        title={t('ProfileErrorTitle')}
        text={t('ProfileErrorDescription')}
        align="center"
        variants="error"
      />
    </HStack>
  );
};

export const ProfileCardLoaderRedesigned = () => {
  return (
    <Card padding="24" fullWidth>
      <VStack gap="32" max>
        <HStack max justify="center">
          <Skeleton border="100%" width={128} height={128} />
        </HStack>
        <HStack gap="24" max>
          <VStack gap="16" max>
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
          </VStack>
          <VStack gap="16" max>
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
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

  return (
    <Card fullWidth>
      <VStack gap="32" max className={className}>
        {data?.avatar && (
          <HStack justify="center" max>
            <Avatar src={data.avatar} size={128} />
          </HStack>
        )}
        <HStack gap="24" max>
          <VStack gap="16" max>
            <Input
              label={t('name')}
              value={data?.firstname}
              onChange={onChangeFirstname}
              readonly={readonly}
              data-testid="EditableProfileCard.firstname"
            />
            <Input
              label={t('surname')}
              value={data?.lastname}
              onChange={onChangeLastname}
              readonly={readonly}
              data-testid="EditableProfileCard.lastname"
            />
            <Input
              label={t('age')}
              value={data?.age}
              onChange={onChangeAge}
              readonly={readonly}
              data-testid="EditableProfileCard.age"
            />
            <Input
              label={t('city')}
              value={data?.city}
              onChange={onChangeCity}
              readonly={readonly}
            />
          </VStack>
          <VStack gap="16" max>
            <Input
              label={t('username')}
              value={data?.username}
              onChange={onChangeUsername}
              readonly={readonly}
            />
            <Input
              label={t('avatar')}
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
        </HStack>
      </VStack>
    </Card>
  );
});
