import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AdminPanel = () => {
  const { t } = useTranslation('admin');
  return <Page data-testid="AdminPanel">{t('admin')}</Page>;
};

export default AdminPanel;
