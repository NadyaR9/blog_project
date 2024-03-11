import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import { Currency } from 'entites/Currency';
import { Country } from 'entites/Country';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/config/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextVariants, VStack } from 'shared/ui';
import { ProfileCard } from 'entites/Profile';
import { DynamicModuleLoader, ReducerList } from 'shared/config/lib/components';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileLoading } from '../../model/selectors/getProfileLoading/getProfileLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema';
import { profileActions, profileReducer } from '../../model/slices/profileSlice';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
    id: string,
    className?: string,
}

const reducers: ReducerList = {
  profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className, id } = props;
  const { t } = useTranslation('profile');

  const dispatch = useAppDispatch();
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileLoading);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);
  const form = useSelector(getProfileForm);

  const validateErrorTranslates: Record<ValidateProfileError, string> = {
    [ValidateProfileError.INVALID_AGE]: t('invalid age'),
    [ValidateProfileError.INVALID_USER_DATA]: t('invalid user data'),
    [ValidateProfileError.INVALID_COUNTRY]: t('invalid country'),
    [ValidateProfileError.NO_DATA]: t('no data'),
    [ValidateProfileError.SERVER_ERROR]: t('server error'),
  };

  const onChangeFirstname = useCallback((value: string = '') => {
    dispatch(profileActions.updateProfile({ firstname: value }));
  }, [dispatch]);

  const onChangeLastname = useCallback((value: string = '') => {
    dispatch(profileActions.updateProfile({ lastname: value }));
  }, [dispatch]);

  const onChangeCity = useCallback((value: string = '') => {
    dispatch(profileActions.updateProfile({ city: value }));
  }, [dispatch]);

  const onChangeUsername = useCallback((value: string = '') => {
    dispatch(profileActions.updateProfile({ username: value }));
  }, [dispatch]);

  const onChangeAvatar = useCallback((value: string = '') => {
    dispatch(profileActions.updateProfile({ avatar: value }));
  }, [dispatch]);

  const onChangeCurrency = useCallback((currency: Currency) => {
    dispatch(profileActions.updateProfile({ currency }));
  }, [dispatch]);

  const onChangeCountry = useCallback((country: Country) => {
    dispatch(profileActions.updateProfile({ country }));
  }, [dispatch]);

  const onChangeAge = useCallback((value: string = '') => {
    const validateAge = value.replace(/\D+/gm, '');

    dispatch(profileActions.updateProfile({ age: Number(validateAge) || 0 }));
  }, [dispatch]);

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  return (
    <DynamicModuleLoader reducerList={reducers} removeAfterUnmount>
      <VStack gap="16" max>
        <EditableProfileCardHeader />
        { validateErrors?.length && validateErrors.map((err: ValidateProfileError) => (
          <Text
            text={validateErrorTranslates[err]}
            variants={TextVariants.ERROR}
            key={err}
          />
        )) }
        <ProfileCard
          data={form}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeCity={onChangeCity}
          onChangeAge={onChangeAge}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </VStack>
    </DynamicModuleLoader>
  );
});
