import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  Button as ButtonDeprecated,
  ButtonVariants,
} from '../../../shared/ui/deprecated/Button';
import { Button } from '../../../shared/ui/redesigned/Button';
import { ToggleFeature } from '@/shared/lib/features';

interface LanguageSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LanguageSwitcher = memo(
  ({ className, short }: LanguageSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = () => {
      i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
      <ToggleFeature
        name="isAppRedesigned"
        off={
          <ButtonDeprecated
            className={classNames('', {}, [className])}
            variants={ButtonVariants.SECONDARY}
            onClick={handleLanguageChange}
          >
            {short ? t('Short lang') : t('Lang')}
          </ButtonDeprecated>
        }
        on={
          <Button variants="clear" onClick={handleLanguageChange}>
            {short ? t('Short lang') : t('Lang')}
          </Button>
        }
      />
    );
  },
);
