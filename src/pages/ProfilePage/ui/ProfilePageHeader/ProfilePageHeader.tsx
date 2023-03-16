import { getProfileReadonly, profileActions, updateProfileData } from 'entites/Profile';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { useAppDispatch } from 'shared/config/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, Button, ButtonVariants } from 'shared/ui';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string,
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);

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
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('profile')} />

      {readonly ? (
        <Button
          variants={ButtonVariants.OUTLINE}
          className={cls.editBtn}
          onClick={onEdit}
        >
          {t('edit')}
        </Button>
      )
        : (
          <div className={cls.actionBtns}>
            <Button
              variants={ButtonVariants.SECONDARY_OUTLINED}
              className={cls.editBtn}
              onClick={onCancel}
            >
              {t('cancel')}
            </Button>
            <Button
              variants={ButtonVariants.PRIMARY_OUTLINED}
              className={cls.editBtn}
              onClick={onSave}
            >
              {t('save')}
            </Button>
          </div>
        )}

    </div>
  );
};
