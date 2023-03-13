import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/config/lib/classNames/classNames';
import {
  Button, ButtonVariants, Input, Text,
} from 'shared/ui';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileLoading } from '../../model/selectors/getProfileLoading/getProfileLoading';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string,
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
  const { t } = useTranslation('profile');
  const data = useSelector(getProfileData);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileLoading);
  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('profile')} />
        <Button
          variants={ButtonVariants.OUTLINE}
          className={cls.editBtn}
        >
          {t('edit')}
        </Button>
      </div>
      <div className={cls.data}>
        <Input
          placeholder={t('name')}
          value={data?.first}
        />
        <Input
          placeholder={t('surname')}
          value={data?.lastname}
        />
      </div>
    </div>
  );
};
