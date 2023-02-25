import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames/classNames';
import { Button, ButtonVariants } from '../Button/Button';

interface LanguageSwitcherProps {
  className?: string,
  short?: boolean,
}

export function LanguageSwitcher({ className, short }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      className={classNames('', {}, [className])}
      variants={ButtonVariants.DEFAULT}
      onClick={handleLanguageChange}
    >
      {short ? t('Short lang') : t('Lang')}
    </Button>
  );
}
