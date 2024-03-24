import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import cls from './PageError.module.scss';
import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';

interface PageErrorProps {
  className?: string,
}

export const PageError = memo(({ className }: PageErrorProps) => {
  const { t } = useTranslation();
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <VStack max justify="center" className={classNames(cls.PageError, {}, [className])}>
      <div className={cls.errorText}>
        {t('Something went wrong')}
      </div>
      <Button
        onClick={reloadPage}
      >
        {t('Please, reload page')}
      </Button>
    </VStack>
  );
});
