import { getUserAuthData } from 'entites/User';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { useAppDispatch } from 'shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Text, Button, ButtonVariants, HStack,
} from 'shared/ui';
import { profileActions } from '../../model/slices/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

interface ProfilePageHeaderProps {
  className?: string,
}

export const EditableProfileCardHeader = ({ className }: ProfilePageHeaderProps) => {
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
    <HStack max justify="between" className={classNames('', {}, [className])}>
      <Text title={t('profile')} />
      {canEdit && (
        <div>
          {readonly ? (
            <Button
              variants={ButtonVariants.OUTLINE}
              onClick={onEdit}
            >
              {t('edit')}
            </Button>
          )
            : (
              <HStack gap="16">
                <Button
                  variants={ButtonVariants.SECONDARY_OUTLINED}
                  onClick={onCancel}
                >
                  {t('cancel')}
                </Button>
                <Button
                  variants={ButtonVariants.PRIMARY_OUTLINED}
                  onClick={onSave}
                >
                  {t('save')}
                </Button>
              </HStack>
            )}
        </div>
      )}

    </HStack>
  );
};
