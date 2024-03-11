import { useParams } from 'react-router-dom';
import { Page, Text } from 'shared/ui';
import { EditableProfileCard } from 'features/editableProfileCard';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('profile');

  if (!id) {
    return <Text text={t('Profile not found')} />;
  }
  return (
    <Page>
      <EditableProfileCard id={id} />
    </Page>
  );
};

export default ProfilePage;
