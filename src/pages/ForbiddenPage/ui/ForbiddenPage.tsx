import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui';

const ForbiddenPage = () => {
  const { t } = useTranslation('admin');
  return (
    <Page>
      {t('Access denied')}
    </Page>
  );
};

export default ForbiddenPage;
