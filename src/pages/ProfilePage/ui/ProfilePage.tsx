import { profileReducer } from 'entites/Profile/model/slice/profileSlice';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducerList } from 'shared/config/lib/components';

const reducers: ReducerList = {
  profile: profileReducer,
};

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  return (
    <DynamicModuleLoader reducerList={reducers} removeAfterUnmount>
      <div>
        {t('profile')}
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
