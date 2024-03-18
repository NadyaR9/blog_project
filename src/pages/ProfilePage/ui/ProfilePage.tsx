import { useParams } from 'react-router-dom';
import { Page } from '@/shared/ui';
import { EditableProfileCard } from '@/features/editableProfileCard';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page>
      <EditableProfileCard id={id} />
    </Page>
  );
};

export default ProfilePage;
