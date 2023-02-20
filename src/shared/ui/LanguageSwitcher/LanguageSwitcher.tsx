import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Button, VariantsButton } from '../Button/Button';

interface LanguageSwitcherProps {
  className?: string,
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      className={classNames('', {}, [className])}
      variants={VariantsButton.DEFAULT}
      onClick={handleLanguageChange}
    >
      {t('English')}
    </Button>
  );
}
