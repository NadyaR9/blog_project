import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { classNames } from '@/shared/config/lib/classNames/classNames';
import { getRouteArticles } from '@/shared/const/router';
import { Button, ButtonVariants } from '@/shared/ui/Button';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('articles');

    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    return (
      <div className={classNames('', {}, [className])}>
        <Button
          variants={ButtonVariants.BACKGROUND_INVERTED}
          onClick={onBackToList}
        >
          {t('Go Back')}
        </Button>
      </div>
    );
  },
);
