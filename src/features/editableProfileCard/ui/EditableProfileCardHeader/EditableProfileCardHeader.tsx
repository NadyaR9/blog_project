import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from '../../model/slices/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';
import {
  Button as ButtonDeprecated,
  ButtonVariants,
} from '@/shared/ui/deprecated/Button';
import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { ToggleFeature } from '@/shared/lib/features';

interface ProfilePageHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = ({
  className,
}: ProfilePageHeaderProps) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;
  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancel = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <HStack
          max
          justify="between"
          className={classNames('', {}, [className])}
        >
          <TextRedesigned title={t('profile')} />
          {canEdit && (
            <div>
              {readonly ? (
                <ButtonRedesigned
                  variants="outline"
                  onClick={onEdit}
                  data-testid="EditableProfileCardHeader.EditButton"
                >
                  {t('edit')}
                </ButtonRedesigned>
              ) : (
                <HStack gap="16">
                  <ButtonRedesigned
                    variants="outline"
                    onClick={onCancel}
                    data-testid="EditableProfileCardHeader.CancelButton"
                    color="error"
                  >
                    {t('cancel')}
                  </ButtonRedesigned>
                  <ButtonRedesigned
                    variants="outline"
                    onClick={onSave}
                    data-testid="EditableProfileCardHeader.SaveButton"
                    color="success"
                  >
                    {t('save')}
                  </ButtonRedesigned>
                </HStack>
              )}
            </div>
          )}
        </HStack>
      }
      off={
        <HStack
          max
          justify="between"
          className={classNames('', {}, [className])}
        >
          <TextDeprecated title={t('profile')} />
          {canEdit && (
            <div>
              {readonly ? (
                <ButtonDeprecated
                  variants={ButtonVariants.OUTLINE}
                  onClick={onEdit}
                  data-testid="EditableProfileCardHeader.EditButton"
                >
                  {t('edit')}
                </ButtonDeprecated>
              ) : (
                <HStack gap="16">
                  <ButtonDeprecated
                    variants={ButtonVariants.SECONDARY_OUTLINED}
                    onClick={onCancel}
                    data-testid="EditableProfileCardHeader.CancelButton"
                  >
                    {t('cancel')}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    variants={ButtonVariants.PRIMARY_OUTLINED}
                    onClick={onSave}
                    data-testid="EditableProfileCardHeader.SaveButton"
                  >
                    {t('save')}
                  </ButtonDeprecated>
                </HStack>
              )}
            </div>
          )}
        </HStack>
      }
    />
  );
};
