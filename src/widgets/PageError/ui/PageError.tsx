import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/config/lib/classNames';
import { Button } from 'shared/ui';
import cls from './PageError.module.scss';

interface PageErrorProps {
  className?: string,
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation();
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <div className={cls.errorText}>
        {t('Something went wrong')}
      </div>
      <Button
        onClick={reloadPage}
      >
        {t('Please, reload page')}
      </Button>
    </div>
  );
};
