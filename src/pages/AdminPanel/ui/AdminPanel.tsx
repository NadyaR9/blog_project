import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AdminPanel = () => {
  const { t } = useTranslation('admin');
  return (
    <Page>
      {t('admin')}
    </Page>
  );
};

export default AdminPanel;
