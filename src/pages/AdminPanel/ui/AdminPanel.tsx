import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui';

const AdminPanel = () => {
  const { t } = useTranslation('admin');
  return (
    <Page>
      {t('admin')}
    </Page>
  );
};

export default AdminPanel;
