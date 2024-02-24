import { Country } from 'entites/Country';
import { Currency } from 'entites/Currency';
import {
  fetchProfileData,
  getProfileError,
  getProfileLoading,
  ProfileCard,
  profileActions,
  profileReducer,
  getProfileReadonly,
  getProfileForm,
  getProfileValidateErrors,
  ValidateProfileError,
} from 'entites/Profile';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducerList } from 'shared/config/lib/components';
import { Page, Text, TextVariants } from 'shared/ui';
import { useAppDispatch } from 'shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { useInitialEffect } from 'shared/config/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducerList = {
  profile: profileReducer,
};

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileLoading);
  const readonly = useSelector(getProfileReadonly);
  const form = useSelector(getProfileForm);
  const validateErrors = useSelector(getProfileValidateErrors);

  const validateErrorTranslates = {
    [ValidateProfileError.INVALID_AGE]: t('invalid age'),
    [ValidateProfileError.INVALID_USER_DATA]: t('invalid user data'),
    [ValidateProfileError.INVALID_COUNTRY]: t('invalid country'),
    [ValidateProfileError.NO_DATA]: t('no data'),
    [ValidateProfileError.SERVER_ERROR]: t('server error'),
  };

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

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

  return (
    <DynamicModuleLoader reducerList={reducers} removeAfterUnmount>
      <Page>
        <ProfilePageHeader />
        { validateErrors?.length && validateErrors.map((err) => (
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
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
