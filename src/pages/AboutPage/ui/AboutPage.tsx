import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui';

function AboutPage() {
  const { t } = useTranslation('about');
  return (
    <Page>
      {t('about')}
    </Page>
  );
}

export default AboutPage;
