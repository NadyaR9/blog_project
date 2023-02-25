import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui';
import { ButtonVariants } from 'shared/ui/Button/Button';

export const BugButton = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<boolean>(false);
  const onThrowError = () => {
    setError((prev) => !prev);
  };

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);
  return (
    <Button
      onClick={onThrowError}
      variants={ButtonVariants.OUTLINE}
    >
      {t('create error')}
    </Button>
  );
};
