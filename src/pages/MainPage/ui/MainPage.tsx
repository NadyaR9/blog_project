import { useTranslation } from 'react-i18next';

function MainPage() {
  const { t } = useTranslation('main');
  return (
    <div>
      {t('main')}
    </div>
  );
}
export default MainPage;
