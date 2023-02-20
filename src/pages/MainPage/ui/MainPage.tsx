import { BugButton } from 'app/providers/ErrorBoundary';
import { useTranslation } from 'react-i18next';

function MainPage() {
  const { t } = useTranslation('main');
  return (
    <div>
      {t('main')}
      <BugButton />
    </div>
  );
}
export default MainPage;
