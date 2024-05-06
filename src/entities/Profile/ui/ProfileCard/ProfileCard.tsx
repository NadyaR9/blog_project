import { memo } from 'react';
import { Profile } from '../../model/types/profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { ToggleFeature } from '@/shared/lib/features';
import {
  ProfileCardDeprecated,
  ProfileCardErrorDeprecated,
  ProfileCardLoaderDeprecated,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
  ProfileCardErrorRedesigned,
  ProfileCardLoaderRedesigned,
  ProfileCardRedesigned,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
  const { isLoading, error } = props;

  if (isLoading) {
    return (
      <ToggleFeature
        name="isAppRedesigned"
        off={<ProfileCardLoaderDeprecated />}
        on={<ProfileCardLoaderRedesigned />}
      />
    );
  }
  if (error) {
    return (
      <ToggleFeature
        name="isAppRedesigned"
        off={<ProfileCardErrorDeprecated />}
        on={<ProfileCardErrorRedesigned />}
      />
    );
  }

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={<ProfileCardRedesigned {...props} />}
      off={<ProfileCardDeprecated {...props} />}
    />
  );
});
