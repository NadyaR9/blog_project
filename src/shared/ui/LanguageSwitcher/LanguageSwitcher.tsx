import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames';
import { Button, VatiantsButton } from '../Button/Button';
import cls from './LanguageSwitcher.module.scss';

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
      className={classNames(cls.LanguageSwitcher, {}, [className])}
      variants={VatiantsButton.DEFAULT}
      onClick={handleLanguageChange}
    >
      {t('English')}
    </Button>
  );
}
